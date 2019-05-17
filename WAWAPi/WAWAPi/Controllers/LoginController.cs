using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entities;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace WAWAPi.Controllers
{ 
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        string ConnectionString = "";
        public LoginController(IConfiguration con)
        {
            _configuration = con;

        }


        [HttpPost]
        [Route("api/[controller]/AddLoginoutLog")]
        public int AddLoginoutLog(LoginoutLog emp)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@EmployeeId", emp.EmployeeId);
            parameters.Add("@Email", emp.Email);
            parameters.Add("@Operation", emp.Operation);
            int Result;

            try
            {

                using (var con = new SqlConnection(_configuration["ConnectionString"]))
                {
                    Result = con.Execute("usp_kmit_AddLoginOut", parameters, commandType: CommandType.StoredProcedure);

                }

                return Result;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
        }

        [HttpGet]
        [Route("api/[controller]/ValildateForLogin")]
        public LoginResult ValildateForLogin(string Email, string Password)
        {
            var parameters = new DynamicParameters();
            LoginResult Status=new LoginResult();
            parameters.Add("@Email", Email);
            parameters.Add("@password", Password);
            try
            {
                using (var con = new SqlConnection(_configuration["ConnectionString"]))
                {
                    //con.Execute("kmit_ValidateForLogin", parameters, commandType: CommandType.StoredProcedure);
                    Status = con.Query<LoginResult>("kmit_ValidateForLogin", parameters, commandType: CommandType.StoredProcedure).SingleOrDefault<LoginResult>();
                }

            }
            catch (Exception)
            {

                throw;
            }
            if (Status != null && Status.Status.Trim().ToUpper() == "SUCCESS")
            {
                LoginoutLog Log = new LoginoutLog();
                Log.EmployeeId = Status.EmployeeId;
                Log.Email = Status.Email;
                Log.Operation = "LOGIN";
                AddLoginoutLog(Log);
            }
            return Status;


            
        }
    }

}
