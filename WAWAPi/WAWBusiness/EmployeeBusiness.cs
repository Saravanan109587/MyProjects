using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Net.Mail;
using System.IO;

namespace WAWBusiness
{
    public class EmployeeBusiness
    {

        public string ThreadMail(List<byte[]> Attachment, List<string> AttachmentFileName, List<string> emailList,string Subject, string body)
        {
            try
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    var Msg = new MailMessage();
                    Msg.Body = "<h3>Hi Team,</h3><br/>";
                    foreach (string email in emailList)
                    {
                        Msg.To.Add(email);
                    }
                    
                    Msg.Subject = Subject;

                    if (body != null)
                    {
                        Msg.Body += body;
                    }
                    else
                    { 
                        Msg.Body += "<h1><b>It seems like you have't Update Todays's Step Count,So Please Update your step Count for Today "+"("+DateTime.Now.ToString("MM/dd/yyyy")+")</b></h1>";

                    }

                    //Msg.Attachments.Add(new Attachment(System.Web.Hosting.HostingEnvironment.MapPath("~/Files/e.pdf")));
                    if (AttachmentFileName != null && AttachmentFileName.Count > 0)
                    {
                        for (var i = 0; i < Attachment.Count; i++)
                        {
                            Msg.Attachments.Add(new Attachment(new MemoryStream(Attachment[i]), AttachmentFileName[i]));
                        }
                    }

                    Msg.IsBodyHtml = true;
                    var smtp = new SmtpClient();
                    Msg.From = new MailAddress("info@kmitsolutions.com");
                    Msg.CC.Add("info@kmitsolutions.com");

                    //smtp.Host = Host;
                    //smtp.EnableSsl = EnableSSL;
                    //System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                    //NetworkCred.UserName = UserName;
                    //NetworkCred.Password = Password;
                    //smtp.UseDefaultCredentials = true;
                    //smtp.Credentials = NetworkCred;
                    //smtp.Port = Convert.ToInt32(Port);
                     
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                    NetworkCred.UserName = "info@kmitsolutions.com";
                    NetworkCred.Password = "cpnsjliiciesthyz";
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 587;
                    smtp.Send(Msg);

                      
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return "Success";
        }
    }
}
