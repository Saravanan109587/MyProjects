using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Ocelot.Configuration.Builder;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.Extensions.DependencyInjection;
namespace APIgateWay
{
    public class Program
    {

       
            public static void Main(string[] args)
            {

                IWebHostBuilder builder = new WebHostBuilder();

                builder.ConfigureServices(s => {
                    s.AddSingleton(builder);
                });

                builder.UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseStartup<Startup>();

                var host = builder.Build();

                host.Run();
            }
        



    }
}
