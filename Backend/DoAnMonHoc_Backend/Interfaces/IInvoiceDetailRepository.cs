using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IInvoiceDetailRepository
    {
        Task CreateInvoiceDetail(InvoiceDetail invoiceDetail);
        Task<IEnumerable<InvoiceDetail>> GetInvoiceDetails();
        Task<InvoiceDetail> GetInvoiceDetail(int id);
        Task<bool> InvoiceDetailExist(int id);
        Task<IActionResult> UpdateInvoiceDetail(InvoiceDetail invoiceDetail);
        Task DeleteInvoiceDetail(int id);
    }
}
