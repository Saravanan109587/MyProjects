using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WAW.Interface
{
    public interface ILogin
    {

        string Email { get; set; }

        string Password { get; set; }
    }
}
