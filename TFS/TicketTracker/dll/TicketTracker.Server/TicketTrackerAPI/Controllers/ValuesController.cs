using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TicketTrackerAPI.HUBS;
using Microsoft.AspNetCore.SignalR;

namespace TicketTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IHubContext<TicketNotifierHub> _TicketNotifierHub;

        //private readonly ITicketNotifierHub _TicketNotifierHub;
        public ValuesController(IHubContext<TicketNotifierHub> TicketHub)
        {

            _TicketNotifierHub = TicketHub;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            string test = null;         
            _TicketNotifierHub.Clients.All.SendAsync("ReceiveMessage", "Suucess Message");
            return "value";
        }

        
    }
}
