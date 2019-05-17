using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TicketNotifierAPI.HUBS
{ 
    public class TicketNotifierHub:Hub
    {
        public async Task TicketNotifier(string mesg)
        {
           await Clients.All.SendAsync("", mesg);

        }

    }
}
