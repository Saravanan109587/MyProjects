Create Table Ticketmaster (TicketId int primary key identity,ClientName nvarchar(50),DeveloperName nvarchar(50),Module nvarchar(50),DEscription nvarchar(500),ShortNotes nvarchar(50),priority int) 

SElect * from Ticketmaster
exec sp_executesql N'kmit_AddTicket',N'@ClientName nvarchar(6),@DeveloperName nvarchar(7),@Module nvarchar(9),@DEscription nvarchar(5),@ShortNotes nvarchar(5),@priority int',@ClientName=N'Casela',@DeveloperName=N'sanjith',@Module=N'Admission',@DEscription=N'Dummy',@ShortNotes=N'Dummy',@priority=2
--Exec kmit_AddTicket 'CWMA','Suresh','Admission','Email not Sending to the Clients','Email not Send',1
Create Procedure kmit_AddTicket
 
@ClientName nvarchar(50),
@DeveloperName nvarchar(50),
@Module nvarchar(50),
@DEscription nvarchar(500),
@ShortNotes nvarchar(50),
@priority int

As BEGIN

insert into Ticketmaster values(@ClientName,@DeveloperName,@Module,@DEscription,@ShortNotes,@priority)
END
GO


Create Procedure kmit_DeleteTicket
 
@TicketId int
 
As 
BEGIN
 Delete from Ticketmaster where TicketId =@TicketId
END
GO


Create Procedure kmit_SelectTicket
 
@TicketId int
 
As 
BEGIN
 Select * from Ticketmaster where TicketId =@TicketId
END
GO