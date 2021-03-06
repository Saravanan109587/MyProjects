Alter table  kmit_CandidateDetail Alter column CommentsfromHR varchar(max)
 Alter table  kmit_CandidateDetail Alter column CommentsfromInterviewer varchar(max)
 
  
 --Select * from kmit_CandidateDetail where EmailId='ns@kmit.com'
ALTER Procedure [dbo].[sp_addcandidates]  
@fname varchar(100),   
@email varchar(30),  
@phone varchar(20),    
@dateOfInterview datetime ,
@DOb dateTime,
@CurrentCTC int,  
@ExpectedCTC int,
@Experience int,
@NoticePeriod int,
@Interviewer varchar(100),
@CommentsfromInterviewer varchar(max),
@Hometown varchar(50),
@updtaeId varchar(30),
@LastName varchar(30)='',
@CommentsFRomHr varchar(max)='',
@status varchar(30)='' ,
@Department varchar(50),
@dateOfPhoneInterview dateTime,
@ReferedBy varchar(50)=''
  
  
As  
BEGIN  
  
declare @existsCandidate varchar(100)=''

 if(not Exists(Select EmailId from kmit_CandidateDetail where  
 EmailId=@email))  
 BEGIN  
    
    insert into kmit_CandidateDetail values(@dateOfInterview,@DOb,@fname,@email,@phone,@Hometown,@Experience,@CurrentCTC,@ExpectedCTC,@NoticePeriod,@Interviewer,@CommentsfromInterviewer,Getdate(),@updtaeId,@status,@CommentsFRomHr,@LastName,@Department,@dateOfPhoneInterview,@ReferedBy)  
    set @existsCandidate='success'; 
 END  
  ELSE  
  BEGIN  
  set @existsCandidate=@email;  
  END  
Select @existsCandidate as status  
  
END  
  