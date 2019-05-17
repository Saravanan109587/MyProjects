using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entities;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using Microsoft.Extensions.Configuration;
using WAWBusiness;

namespace WAWAPi.Controllers
{
   
    [ApiController]
     
    public class WAWController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        string ConnectionString = "";
        public WAWController(IConfiguration con)
        {
            _configuration = con;

        }
         

        [HttpPost]
        [Route("api/[controller]/AddEmployee")]
        
        public string AddEmployee(Employee employee)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@Name", employee.Name);
            parameters.Add("@Email", employee.Email);
            parameters.Add("@Password", employee.Password);
            parameters.Add("@updateId", employee.UpdateId);

            try
            {
                string result;
                using (var con = new SqlConnection(_configuration["ConnectionString"]))
                {
                    result = con.Query<string>("kmit_Insert_Employee", parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();

                }


                return result;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

        }

       
        [HttpGet]
        [Route("api/[controller]/getAdminUsers")]
        public List<Employee> getAdminUsers()
        {
            List<Employee> adminUsers;
            try
            {
                using (var con = new SqlConnection(_configuration["ConnectionString"]))
                {
                    //con.Execute("kmit_ValidateForLogin", parameters, commandType: CommandType.StoredProcedure);
                    adminUsers = con.Query<Employee>("kmit_GetAdminUsers", commandType: CommandType.StoredProcedure).ToList<Employee>();
                }            
            }
            catch (Exception)
            {

                throw;
            }

            return adminUsers;
        }


        [HttpPost]
        [Route("api/[controller]/AddStepCount")]
        public string AddStepCount(kmit_Employee_Steps employee)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@EmployeeId", employee.EmployeeId);
            parameters.Add("@Date", employee.DateOfStepCount);
            parameters.Add("@stepCount", employee.StepCount);
            

            try
            {
                string result;
                using (var con = new SqlConnection(_configuration["ConnectionString"]))
                {
                    result = con.Query<string>("kmit_InsertSteps", parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();

                }


                return result;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

        }
        [HttpGet]
        [Route("api/[controller]/GetEmployeeStepsbyId")]
        public List<GetEmployeeStepsResult> GetEmployeeStepsbyId(string  Email,int EmpId)
        {


            var parameters = new DynamicParameters();

            parameters.Add("@EmployeeId", EmpId);
            parameters.Add("@Email", Email);
            List<GetEmployeeStepsResult> adminUsers;
            try
            {
                using (var con = new SqlConnection(_configuration["ConnectionString"]))
                {
                    //con.Execute("kmit_ValidateForLogin", parameters, commandType: CommandType.StoredProcedure);
                    adminUsers = con.Query<GetEmployeeStepsResult>("usp_Kmit_GetEmployeeStepsbyId", parameters, commandType: CommandType.StoredProcedure).ToList<GetEmployeeStepsResult>();
                }
            }
            catch (Exception e)
            {

                throw;
            }

            return adminUsers;
        }

        [HttpPost]
        [Route("api/[controller]/GetEmailForReminder")]
        public string GetEmailForReminder()
        {
            List<string> EmailList = new List<string>();

            try
            {
                
                using (var con = new SqlConnection(_configuration["ConnectionString"]))
                {
                    EmailList = con.Query<string>("Usp_Kmit_GetEmailForReminder", commandType: CommandType.StoredProcedure).ToList<string>();

                }

                if(EmailList.Count > 0)
                {
                    EmployeeBusiness mail = new EmployeeBusiness();
                    mail.ThreadMail(null, null, EmailList, "REMINDER", null);
                }
                return "";
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

        }



    }
}
