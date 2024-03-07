using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<IActionResult> CreateInvoice(Invoice invoice);
        Task<IEnumerable<Invoice>> GetInvoices(string userID);
        Task<IEnumerable<Invoice>> GetInvoicesForAdmin();
        Task<IEnumerable<Invoice>> GetInvoicesByStatus(string userID, string status);
        Task<IEnumerable<SaleModel>> GetSalesOfYear();
        Task<Invoice> GetInvoice(int id);
        Task<bool> InvoiceExist(int id);
        Task<IActionResult> UpdateInvoice(Invoice invoice);
        Task<IActionResult> UpdateStatusInvoice(int id, string status);
        Task DeleteInvoice(int id);
    }
}
