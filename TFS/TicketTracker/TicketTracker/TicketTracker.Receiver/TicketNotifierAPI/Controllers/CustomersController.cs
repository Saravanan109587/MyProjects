using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;
using TicketNotifierAPI.HUBS;
using Microsoft.AspNetCore.SignalR;
namespace TicketNotifierAPI.Controllers
{
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        private readonly IEventBus _eventBus;
        private readonly IHubContext<TicketNotifierHub> _TicketNotifyHub;
        public CustomersController(IEventBus eventBus, IHubContext<TicketNotifierHub> hub)
        {
            _eventBus = eventBus;
            _TicketNotifyHub = hub;
        }
        
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Catcher Wong", "James Li" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {

            _TicketNotifyHub.Clients.All.SendAsync("ReceiveMessage", "Receiver");
            return $"Catcher Wong - {id}";
        }
    }
}
