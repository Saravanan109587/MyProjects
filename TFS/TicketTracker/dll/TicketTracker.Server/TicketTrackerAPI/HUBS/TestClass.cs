using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketTrackerAPI.HUBS
{
    public class TestClass: ITicketNotifier
    {

        public void   SendMessage(string message)
        {
            Console.WriteLine("");
        }
    }
}
