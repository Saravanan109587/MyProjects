 
--Select Convert(date,'2018-06-04T18:30:00.000Z',101) 
 

-- EXEC [sp_SerarchCandidateDetails] '','0','','ALL','','','',0,0,'2018-06-04T18:30:00.000Z','12/12/1920',0,0,''
ALTER Procedure [dbo].[sp_SerarchCandidateDetails]
@name varchar(100),
@phoneNumber varchar(100),
@department varchar(100),
@status varchar(100),
@interviewer varchar(100),
@referedBy varchar(100),
@hometown varchar(100),
@currentCTC int,
@ExpecCTC int,
@DateOfInterview varchar(100),
@dateofPhoneinterview varchar(100),
@noticeperiod int,
@experience int,
@email varchar(100)
As
Begin
 
  Select CandidateId,convert(varchar(10),DateofInterview,101)as	DateofInterview,convert(varchar(10),DOB,101) as DOB,	Name,	EmailId,	PhoneNo,	Hometown,	Experience,	CurrentCTC,	ExpectedCTC,
  	NoticePeriod,	Interviewer,	CommentsfromInterviewer,UpdateDate,	UpdateId,	Status,	CommentsfromHR,	LastName,	Department,convert(varchar(10),DateOfPhoneIntervbiew,101) as DateOfPhoneIntervbiew	,
	ReferedBy as ReferedBy
  from kmit_CandidateDetail where  
   CASE @name WHEN ''  THEN '' else Name END like @name+'%'
   And CASE @email WHEN ''  THEN '' else EmailId END like @email+'%'
   And CASE @phoneNumber WHEN '0'  THEN '0' else PhoneNo END like @phoneNumber+'%'
   And CASE @department WHEN ''  THEN '' else Department END like @department+'%'
   And CASE @status WHEN  'ALL'  THEN 'ALL' else Status END like @status+'%'
   And CASE @interviewer WHEN  ''  THEN '' else Interviewer END like @interviewer+'%'
   And CASE @referedBy WHEN  ''  THEN '' else ReferedBy END like @referedBy+'%'
   And CASE @hometown WHEN  ''  THEN '' else Hometown END like @hometown+'%'
   And CASE @currentCTC WHEN  0  THEN 0 else CurrentCTC END = @currentCTC 
   And CASE @ExpecCTC WHEN  0  THEN 0 else ExpectedCTC END = @ExpecCTC 
   And CASE @DateOfInterview WHEN '12/12/1920'  THEN '12/12/1920' else Convert(date,DateofInterview) END = Convert(date,@DateOfInterview)
   And CASE @dateofPhoneinterview WHEN '12/12/1920'  THEN '12/12/1920' else Convert(date,DateOfPhoneIntervbiew) END = Convert(date,@dateofPhoneinterview)
   And CASE @noticeperiod WHEN  0  THEN 0 else NoticePeriod END = @noticeperiod 
   And CASE @experience WHEN  0  THEN 0 else Experience END = @experience 
	
End


--Select convert(date,'2018/06/19 17:26:27.000')