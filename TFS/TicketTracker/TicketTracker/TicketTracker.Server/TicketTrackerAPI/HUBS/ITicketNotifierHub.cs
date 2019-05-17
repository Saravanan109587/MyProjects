using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketTrackerAPI.HUBS
{
    public interface ITicketNotifierHub
    {
        Task ReceiveMessage(string message);
    }

    public interface ITicketNotifier 
    {
        void ReceiveMessage(string message);
    }
}
