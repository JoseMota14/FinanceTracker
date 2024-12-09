using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;

namespace ServiceWorker.Utils
{
    public static class Email
    {
        public static Task SendEmail(string toEmail, string subject,  string body)
        {

            var client = new SmtpClient("live.smtp.mailtrap.io", 587)
            {
                Credentials = new NetworkCredential("api", "075169018642ca2e470f8e478adad99e"),
                EnableSsl = true
            };
            client.Send("hello@demomailtrap.com", toEmail, subject, body);
            return Task.FromResult(0);
        }

    }
}
