using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace DoAnMonHoc_Backend.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmail(EmailModel emailModel)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration["EmailService2:Username"]));
            email.To.Add(MailboxAddress.Parse(emailModel.To));
            email.Subject = emailModel.Subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = emailModel.Body
            };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_configuration["EmailService2:Host"], 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_configuration["EmailService2:Username"], _configuration["EmailService2:Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);

        }
    }
}
