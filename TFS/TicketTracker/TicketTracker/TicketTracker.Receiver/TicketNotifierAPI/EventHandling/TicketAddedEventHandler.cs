using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;
using TicketNotifierAPI.Events;
using TicketNotifierAPI.HUBS;
using Microsoft.AspNetCore.SignalR;
namespace TicketNotifierAPI.EventHandling
{
    public class TicketAddedEventHandler: IIntegrationEventHandler<TicketAddedEvent>
    {
        private readonly IHubContext<TicketNotifierHub> _TicketNotifierHub;
        public TicketAddedEventHandler(IHubContext<TicketNotifierHub> hub)
        {
            _TicketNotifierHub = hub;
        }

        public async Task  Handle(TicketAddedEvent @event)
        {
             
               await _TicketNotifierHub.Clients.All.SendAsync("ReceiveMessage", @event.Message);
              
        }
 
    }
}
