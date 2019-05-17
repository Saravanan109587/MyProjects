export interface ITicketManager {
      AddnewTicket(TicketDetails:ITicketmaster);
 
}

export interface ITicketmaster {

    TicketId: number;
    ClientName: string;
    DeveloperName: string;
    Module: string;
    Description: string;
    ShortNotes: string;
    Priority?: number;
}

export interface ITicketManagerService{
    AddnewTicket(TicketDetails:ITicketmaster):any;   
}