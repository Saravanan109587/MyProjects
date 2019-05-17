import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

export const  appConfig:any=
{
"SignalRApiURL" :"http://localhost:50313/TicketNotificationHub",
"TicketHandlerApiUrl":""
 
}
export   const connection  = new HubConnectionBuilder()