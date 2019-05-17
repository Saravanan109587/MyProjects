﻿using Microsoft.AspNetCore.Mvc; 
using TicketTrackerAPI.Events;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;

namespace TicketTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoFacTestController : Controller
    {
        //private readonly ITicketNotifierHub _ticketnotifier;
        private readonly IEventBus _eventBus;
        public AutoFacTestController(IEventBus eventBus)
        {
            
            _eventBus = eventBus;
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {           
            var eventMessage = new TicketAddedEvent("Ticket Was Added Successfully");
            _eventBus.Publish(eventMessage);
            return "";
        }
    }
}