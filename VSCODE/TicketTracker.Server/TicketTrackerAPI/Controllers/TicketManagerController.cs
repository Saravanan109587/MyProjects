using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketTrackerAPI.Models;
using EventBus.Abstractions;
using TicketTrackerAPI.Events;
using Microsoft.AspNetCore.Cors;
using System.Data;
using Dapper;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace TicketTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    [EnableCors("CorsPolicy")]
    public class TicketManagerController : ControllerBase
    {
        private readonly TicketTrackerContext _context;
        private readonly IEventBus _eventBus;
        private readonly IConfiguration _configuration;
        public TicketManagerController(TicketTrackerContext context,IEventBus eventbus, IConfiguration configuration)
        {
            _context = context;
            _eventBus = eventbus;
            _configuration = configuration;
        }

        /// <summary>
        /// Get top 10 Tickets based on their priority
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTicketmaster")]
        public List<Ticketmaster> GetTicketmaster()
        {
            List<Ticketmaster> Top10Tickets = new List<Ticketmaster>();
            using(var con=new SqlConnection(_configuration["ConnectionString"]))
            {
                Top10Tickets = con.Query<Ticketmaster>("SELECT TOP 10 * FROM Ticketmaster order by priority ").ToList();
            }

            return Top10Tickets;

            //return _context.Ticketmaster.ToList().OrderBy(x=>x.Priority).Take(10);
        }

       /// <summary>
       /// Used to add new Tickets to database To lets Notify the microservices
       /// </summary>
       /// <param name="ticketmaster"></param>
       /// <returns></returns>
        [HttpPut("AddNewTicket")]
        public  string   AddNewTicket(Ticketmaster ticketmaster)
        {
            var parameters = new DynamicParameters();
            
            string statement = "exec kmit_AddTicket  ";
            //var parameters = new List<SqlParameter>();


            parameters.Add("@ClientName", ticketmaster.ClientName);
            parameters.Add("@DeveloperName", ticketmaster.DeveloperName);
            parameters.Add("@Module", ticketmaster.Module);
            parameters.Add("@DEscription", ticketmaster.Description);
            parameters.Add("@ShortNotes", ticketmaster.ShortNotes);
            parameters.Add("@priority", ticketmaster.Priority);

            //try
            //{
            //    var  result=  _context.Database.ExecuteSqlCommand(statement, parameters.ToArray());
            //    _context.SaveChanges();
            //    var TicketAddedEvent = new TicketAddedEvent("New Ticket Added");
            //    _eventBus.Publish(TicketAddedEvent);
            //}
            //catch(Exception e)
            //{
            //    throw new Exception(e.Message);
            //}


            using (var con=new SqlConnection(_configuration["ConnectionString"]))
            {


                con.Execute("kmit_AddTicket", parameters,commandType: CommandType.StoredProcedure);
            }
                return "Succcess";
             
        }
        /// <summary>
        /// Delete Ticket from Db and notify Clients
        /// </summary>
        /// <param name="TicketId"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("DeleteTicket")]
        public string DeleteTicket(int TicketId)
        {
            string statement = "exec kmit_DeleteTicket @TicketId =" + TicketId;
            //try
            //{
            //    var result = _context.Database.ExecuteSqlCommand(statement);
            //    _context.SaveChanges();
            //    var TicketDeletedEvent = new TicketDeletedEvent("Ticket Deleted");
            //    _eventBus.Publish(TicketDeletedEvent);
            //}
            //catch (Exception e)
            //{
            //    throw new Exception(e.Message);
            //}


            using (var con = new SqlConnection(_configuration["ConnectionString"]))
            {
                con.Execute(statement);
            }
            return "success";
        }
    
       
     
        private bool TicketmasterExists(int id)
        {
            return _context.Ticketmaster.Any(e => e.TicketId == id);
        }
    }
}