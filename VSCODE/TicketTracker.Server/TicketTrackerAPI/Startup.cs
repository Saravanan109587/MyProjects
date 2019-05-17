using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BuildingBlocks.EventBus;
using EventBus.Abstractions;
using BuildingBlocks.EventBusRabbitMQ;
using BuildingBlocks.EventBusServiceBus;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using Swashbuckle.AspNetCore.Swagger;
using System;
using TicketTrackerAPI.HUBS;
using TicketTrackerAPI.Models;


namespace TicketTrackerAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddElmah(options =>
            {
                options.LogPath = "~/Elmahlog"; // OR options.LogPath = "с:\errors";
            });

            services.AddCors(option => option.AddPolicy("CorsPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();


            }));
            services.AddSingleton<IConfiguration>(Configuration);

            services.AddSingleton<IRabbitMQPersistentConnection>(sp =>
            {
                var logger = sp.GetRequiredService<ILogger<DefaultRabbitMQPersistentConnection>>();

                var factory = new ConnectionFactory()
                {
                    HostName = Configuration["HostName"]
                };

                if (!string.IsNullOrEmpty(Configuration["EventBusUserName"]))
                {
                    factory.UserName = Configuration["EventBusUserName"];
                }

                if (!string.IsNullOrEmpty(Configuration["EventBusPassword"]))
                {
                    factory.Password = Configuration["EventBusPassword"];
                }

                var retryCount = 5;
                if (!string.IsNullOrEmpty(Configuration["EventBusRetryCount"]))
                {
                    retryCount = int.Parse(Configuration["EventBusRetryCount"]);
                }

                return new DefaultRabbitMQPersistentConnection(factory, logger, retryCount);
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Ticket Tracker server",
                    Description = "Ticket Tracker Web APi Microservice",
                    TermsOfService = "None",
                    Contact = new Contact() { Name = "Saravanan", Email = "nsaravanan@kmitsolutions.com", Url = "www.kmitsolutions.com" }
                });

                var xmlPath = System.AppDomain.CurrentDomain.BaseDirectory + @"TicketTrackerAPI.xml";
                c.IncludeXmlComments(xmlPath);
            });
            services.AddSignalR();

            //To register Database Connection String
            var connection = Configuration["ConnectionString"];
            services.AddDbContext<TicketTrackerContext>(op => op.UseSqlServer(connection));

            RegisterEventBus(services);

            var containerBuilder = new Autofac.ContainerBuilder();

             //containerBuilder.RegisterType<TicketNotifierHub>().As<ITicketNotifierHub>().InstancePerLifetimeScope();
            //containerBuilder.RegisterType<EventBusServiceBus>().As<IEventBus>().InstancePerLifetimeScope();
            //containerBuilder.RegisterType<EventBusRabbitMQ>().As<IEventBus>().InstancePerLifetimeScope();
            
            containerBuilder.Populate(services);
            var container = containerBuilder.Build();

            return new AutofacServiceProvider(container);
 
        }

         
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();        
            app.UseElmah();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TicketTracker APi");
            });

            app.UseCors("CorsPolicy");

            app.UseSignalR(route =>
            {
                route.MapHub<TicketNotifierHub>("/TicketNotifier");
            });
        }


        private void RegisterEventBus(IServiceCollection services)
        {
            
            var subscriptionClientName = Configuration["QueueName"];

            if (Configuration.GetValue<bool>("AzureServiceBusEnabled"))
            {
                services.AddSingleton<IEventBus, EventBusServiceBus>(sp =>
                {
                    var serviceBusPersisterConnection = sp.GetRequiredService<IServiceBusPersisterConnection>();
                    var iLifetimeScope = sp.GetRequiredService<ILifetimeScope>();
                    var logger = sp.GetRequiredService<ILogger<EventBusServiceBus>>();
                    var eventBusSubcriptionsManager = sp.GetRequiredService<IEventBusSubscriptionsManager>();

                    return new EventBusServiceBus(serviceBusPersisterConnection, logger,
                        eventBusSubcriptionsManager, subscriptionClientName, iLifetimeScope);
                });
            }
            else
            {
                services.AddSingleton<IEventBus, EventBusRabbitMQ>(sp =>
                {
                    var rabbitMQPersistentConnection = sp.GetRequiredService<IRabbitMQPersistentConnection>();
                    var iLifetimeScope = sp.GetRequiredService<ILifetimeScope>();
                    var logger = sp.GetRequiredService<ILogger<EventBusRabbitMQ>>();
                    var eventBusSubcriptionsManager = sp.GetRequiredService<IEventBusSubscriptionsManager>();

                    var retryCount = 5;
                    if (!string.IsNullOrEmpty(Configuration["EventBusRetryCount"]))
                    {
                        retryCount = int.Parse(Configuration["EventBusRetryCount"]);
                    }

                    return new EventBusRabbitMQ(rabbitMQPersistentConnection, logger, iLifetimeScope, eventBusSubcriptionsManager, subscriptionClientName, retryCount);
                });
            }

            services.AddSingleton<IEventBusSubscriptionsManager, InMemoryEventBusSubscriptionsManager>();

           // services.AddTransient<TicketAddedEventHandler>();

        }

        private void ConfigureEventBus(IApplicationBuilder app)
        {
            var eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();
          //  eventBus.Subscribe<TicketAddedEvent, TicketAddedEventHandler>();
        }


    }
    }
 