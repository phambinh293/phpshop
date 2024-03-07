using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class InvoiceDetailRepository : IInvoiceDetailRepository
    {
        private readonly CSDLContext _context;
        public InvoiceDetailRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task CreateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            await _context.InvoiceDetails.AddAsync(invoiceDetail);
        }

        public async Task DeleteInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetails.FindAsync(id);
            if (invoiceDetail != null)
            {
               _context.InvoiceDetails.Remove(invoiceDetail);
            }
        }

        public async Task<InvoiceDetail> GetInvoiceDetail(int id)
        {
            return await _context.InvoiceDetails.Include(i => i.Product)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<InvoiceDetail>> GetInvoiceDetails()
        {
            return await _context.InvoiceDetails.Include(i => i.Product).ToListAsync();
        }

        public async Task<bool> InvoiceDetailExist(int id)
        {
            return await _context.InvoiceDetails.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            _context.Entry(invoiceDetail).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (!await InvoiceDetailExist(invoiceDetail.Id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }
    }
}
