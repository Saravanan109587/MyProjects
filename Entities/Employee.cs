using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Employee
    {

        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UpdateId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Password { get; set; }
        public string IsAdminUser { get; set; }

    }
    public class ILogIn
    {

        public string Email { get; set; }
        public string Password { get; set; }


    }

    public class kmit_Employee_Steps
    {
        public int? EmployeeId { get; set; }
        public decimal? StepCount { get; set; }
        public DateTime? DateOfStepCount { get; set; }
    }


    public class LoginResult
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public int EmployeeId { get; set; }


    }


    public class GetEmployeeStepsResult
    {
         
        public decimal? StepCount { get; set; }
        public DateTime? DateOfStepCount { get; set; }
        public DateTime? UpdateDate { get; set; }


    }

    public class GetEmployeeStepsRequest
    {
        public int? EmployeeId { get; set; }
        public string Email { get; set; }

    }


    public class LoginoutLog
    {
        public int? EmployeeId { get; set; }
        public string Email { get; set; }
        public string Operation { get; set; }

    }
}
