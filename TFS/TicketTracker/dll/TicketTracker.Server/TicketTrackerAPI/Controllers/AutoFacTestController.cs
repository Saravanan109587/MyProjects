using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketTrackerAPI.HUBS;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;
using TicketTrackerAPI.Events;

namespace TicketTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoFacTestController : Controller
    {
        private readonly ITicketNotifier _ticketnotifier;
        private readonly IEventBus _eventBus;
        public AutoFacTestController(ITicketNotifier ticketnotifier, IEventBus eventBus)
        {
            _ticketnotifier = ticketnotifier;
            _eventBus = eventBus;
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {

            _ticketnotifier.SendMessage("test");
            var eventMessage = new TicketAddedEvent("Ticket Was Added Successfully");
            _eventBus.Publish(eventMessage);
            return "";
        }
    }
}