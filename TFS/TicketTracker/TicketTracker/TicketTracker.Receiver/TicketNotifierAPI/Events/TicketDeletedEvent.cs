using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Events;

namespace TicketNotifierAPI.Events
{
    public class TicketDeletedEvent:IntegrationEvent
    {
        public string Message { get; set; }

        public TicketDeletedEvent(string msg)
            => Message = msg;
    }
}
