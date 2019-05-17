using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.eShopOnContainers.BuildingBlocks.EventBus.Abstractions;
using TicketNotifierAPI.Events;
using TicketNotifierAPI.HUBS;

namespace TicketNotifierAPI.EventHandling
{
    public class TicketDeletedEventHandler:IIntegrationEventHandler<TicketDeletedEvent>
    {
        private readonly IHubContext<TicketNotifierHub> _TicketNotifierHub;
        public TicketDeletedEventHandler(IHubContext<TicketNotifierHub> hub)
        {
            _TicketNotifierHub = hub;
        }

        public async Task Handle(TicketDeletedEvent @event)
        {
           await _TicketNotifierHub.Clients.All.SendAsync("ReceiveMessage", @event.Message);
           
        }


       
    }
}
