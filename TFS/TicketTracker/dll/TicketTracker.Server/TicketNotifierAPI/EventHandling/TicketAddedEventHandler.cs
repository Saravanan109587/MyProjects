using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;
using TicketNotifierAPI.Events;

namespace TicketNotifierAPI.EventHandling
{
    public class TicketAddedEventHandler: IIntegrationEventHandler<TicketAddedEvent>
    { 
        public async Task Handle(TicketAddedEvent @event)
        {
           Console.WriteLine(@event.UserId.ToString());
        }
    }
}
