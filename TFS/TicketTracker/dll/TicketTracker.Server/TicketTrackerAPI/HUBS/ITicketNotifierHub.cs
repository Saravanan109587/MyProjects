using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketTrackerAPI.HUBS
{
    public interface ITicketNotifierHub
    {
        Task SendMessage(string message);
    }

    public interface ITicketNotifier 
    {
        void SendMessage(string message);
    }
}
