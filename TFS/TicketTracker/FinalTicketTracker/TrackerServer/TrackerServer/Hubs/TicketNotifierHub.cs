using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TicketTrackerAPI.HUBS
{
    public class TicketNotifierHub : Hub<ITicketNotifierHub>
    {
        public static List<UserConnection> uList = new List<UserConnection>();

        private readonly IHubContext<TicketNotifierHub> _hub;
        /// <summary>
        /// To register a Client
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            var us = new UserConnection();
            var tes = Context.UserIdentifier;
           
            us.UserName =Context.User.Identity.Name;

            us.ConnectionID = Context.ConnectionId;
            uList.Add(us);
            return base.OnConnectedAsync();
        }

        /// <summary>
        /// to Notify Clients
        /// </summary>
     
        public TicketNotifierHub(IHubContext<TicketNotifierHub> hub)
        {
            _hub = hub;

        }
        public async Task ReceiveMessage(string message)
        {

            await _hub.Clients.All.SendAsync("ReceiveMessage", message);
        }

        public class UserConnection
        {
            public string UserName { set; get; }
            public string ConnectionID { set; get; }
        }
    }

    public class UserConnection
    {
        public string UserName { set; get; }
        public string ConnectionID { set; get; }
    }

}
