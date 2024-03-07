using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class productTypeDetailRepository : IProductTypeDetailRepository
    {
        private readonly CSDLContext _context;
        public productTypeDetailRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckExist(int phoneId, int productTypeId)
        {
            var check = await _context.ProductTypeDetails
                            .FirstOrDefaultAsync(p => p.PhoneId == phoneId && p.ProductTypeId == productTypeId);
            if(check == null)
            {
                return false;
            }
            return true;
        }

        public async Task CreateProductTypeDetail(ProductTypeDetail productTypeDetail)
        {
            await _context.ProductTypeDetails.AddAsync(productTypeDetail);
        }

        public async Task DeleteProductTypeDetail(ProductTypeDetail productTypeDetail)
        {
            _context.ProductTypeDetails.Remove(productTypeDetail);
        }

        public async Task<IEnumerable<ProductTypeDetail>> GetProductsByProductType(int productTypeId)
        {
            return await _context.ProductTypeDetails.Include(pt => pt.ProductType)
                .Include(pt => pt.Phone)
                .Include( p => p.Phone)
                    .ThenInclude(p => p.Products)
                .Where(p => p.ProductTypeId == productTypeId)
                .ToListAsync();
        }

        public async Task<IEnumerable<ProductTypeDetail>> GetProductTypeByPhoneId(int phoneId)
        {
            return await _context.ProductTypeDetails
                        .Where(p => p.PhoneId == phoneId)
                        .ToListAsync();
        }

        public async Task<ProductTypeDetail> GetProductTypeDetail(int id)
        {
            return await _context.ProductTypeDetails.Include(pt => pt.ProductType)
                .Include(pt => pt.Phone)
                .FirstOrDefaultAsync(pt => pt.Id == id);
        }

        public async Task<IEnumerable<ProductTypeDetail>> GetProductTypeDetails()
        {
            return await _context.ProductTypeDetails.Include(pt => pt.ProductType)
                .Include(pt => pt.Phone)
                .ToListAsync();
        }

        public async Task<bool> ProductTypeDetailExist(int id)
        {
            return await _context.ProductTypeDetails.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdateProductTypeDetail(ProductTypeDetail productTypeDetail)
        {
            _context.Entry(productTypeDetail).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await ProductTypeDetailExist(productTypeDetail.Id))
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
