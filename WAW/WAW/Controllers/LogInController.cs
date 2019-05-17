using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WAW.Interface;

namespace WAW.Controllers
{
    public class LogInController : Controller
    {
        // GET: LogIn
        public ActionResult Login()
        {
            return View();
        }
       
        public string  ValidateAndLogIn(string  Email,string Password)
        {

            return "Success";
             
        }

        public ActionResult AddSteps()
        {
            return View("~/Views/AddSteps/AddSteps.cshtml");
        }
    }
}