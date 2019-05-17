Create Table kmit_Employees(EmployeeId int primary key identity,Name varchar(50),Email varchar(50),Password varchar(300),UpdateId varchar(50),UpdateDate DateTime,IsAdminUser char(1))
 

   
Create Table kmit_Employee_Steps(EmployeeId int References kmit_Employees(EmployeeId),DateOfStepCount DateTime,StepCount numeric(18)) 
 
   
--EXEC kmit_Insert_Employee 'Saravanan','nsaravanan@kmitsolutions.com','Athira&S1','admin'

Create Proc kmit_Insert_Employee
@Name varchar(50),
@Email varchar(50),
@Password varchar(20),
@updateId varchar(50)
As

BEGIN
insert into kmit_Employees values(@Name,@Email,@updateId,Getdate(), HASHBYTES('SHA2_512', @Password)) 
END
GO
 

 --EXEc kmit_GetAdminUsers
 --Update kmit_Employees set IsAdminUser='Y'
  Create Proc kmit_GetAdminUsers
  As
  BEGIN
  Select Name,Email,EmployeeId from kmit_Employees Where IsAdminUser='Y'
  END
  GO

  --Declare @Status varchar(30)
  --exec kmit_InsertSteps 100,5,'nsaravanan@kmitsolutions.com','2018-11-14',@Status out
  --Select @Status

  Alter Proc kmit_InsertSteps
  @stepCount numeric(18),
  @EmployeeId int,
  @Email varchar(50),
  @Date DateTime,
  @status varchar(30) out
  As
  BEGIN 
 
  if Exists(Select StepCount from kmit_Employee_Steps Where 
  Convert(Date,DateOfStepCount) =Convert(Date,@Date)
  And EmployeeId=@EmployeeId
  )
  BEGIN
  set @status= 'Already Exits'
  END
  Else
  BEGIN
  Insert INto kmit_Employee_Steps values(@EmployeeId,@stepCount,@Date)
  set @status='Inserted'
  END
  ENd
  GO


  --Exec Kmit_AddAdminUser 5,'nsaravanan@kmitsolutions.com' 
  Create Proc Kmit_AddAdminUser
  @EmployeeId int,
  @Email varchar(50)
  As
  BEGIN
  Update kmit_Employees set IsAdminUser ='Y' Where EmployeeId =@EmployeeId
  And Email =@Email
  END
  Go


  --EXEC kmit_ValidateForLogin 'nsaravanan@kmitsolutions.coqm','Athira&S1'
  Alter Proc kmit_ValidateForLogin

  @Email varchar(50),
  @password varchar(20)
  As
  BEGIN
  Declare @Status varchar(30)
  If Exists(Select * from kmit_Employees Where Email=@Email
  And HASHBYTES('SHA2_512', @password)=Password)
	  BEGIN
	  set @Status ='Success'
	  END
Else
	BEGIN
	set @Status ='Failed'
	END

  Select @Status
  END 
  Go

  Create Table kmit_EmployeeLoginOut_Log(EmployeeId int references kmit_Employees(EmployeeId),Email varchar(50),Operation varchar(50),OperationTime DateTime)

  Create Proc usp_kmit_AddLoginOut
@EmployeeId int,
@Email varchar(50),
@Operation varchar(50)
As
BEGIN
insert into kmit_EmployeeLoginOut_Log values(@EmployeeId,@Email,@Operation,Getdate())
END
GO


Create Proc Usp_Kmit_GetEmailForReminder
As
BEGIN
Select  Email from kmit_Employees where EmployeeId not in
 (
Select  em.EmployeeId from kmit_Employees em
inner join kmit_Employee_Steps EMPS with(Nolock) on EMPS.EmployeeId=em.EmployeeId
Where Convert(Date,EMPS.DateOfStepCount) =Convert(Date,Getdate())
)
END
GO