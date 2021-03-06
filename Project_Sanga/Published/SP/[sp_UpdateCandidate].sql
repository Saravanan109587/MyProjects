 --Alter table  kmit_CandidateDetail Alter column CommentsfromHR varchar(max)

--Exec sp_UpdateCandidate
ALTER Procedure [dbo].[sp_UpdateCandidate]
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
@status varchar(30)='',
@Department varchar(50),
@dateOfPhoneInterview dateTime,
@ReferedBy varchar(50)=''
As
BEGIN
Update kmit_CandidateDetail set Name=@fname,EmailId=@email,PhoneNo=@phone,DateofInterview=@dateOfInterview,CurrentCTC=@CurrentCTC,ExpectedCTC=@ExpectedCTC,Experience=@Experience,Interviewer=@Interviewer,CommentsfromInterviewer=@CommentsfromInterviewer,
UpdateDate=getdate(),UpdateId=@updtaeId,NoticePeriod=@NoticePeriod,Hometown=@Hometown,DOB=@DOb,Status=@status,LastName=@LastName,CommentsfromHR=@CommentsFRomHr,Department=@Department,DateOfPhoneIntervbiew=@dateOfPhoneInterview,
ReferedBy=@ReferedBy
where EmailId=@email
END
