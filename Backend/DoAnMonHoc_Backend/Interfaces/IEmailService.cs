using DoAnMonHoc_Backend.Models;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(EmailModel emailModel);
    }
}
