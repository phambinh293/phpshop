using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class ProductTypeRepository : IProductTypeRepository
    {
        private readonly CSDLContext _context;

        public ProductTypeRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task CreateProductType(ProductType productType)
        {
            await _context.ProductTypes.AddAsync(productType);
        }

        public async Task DeleteProductType(int id)
        {
            var pt = await GetProductType(id);

            pt.Status = false;
        }

        public async Task<ProductType> GetProductType(int id)
        {
            return await _context.ProductTypes.FindAsync(id);
        }

        public async Task<IEnumerable<ProductType>> GetProductTypes()
        {
            return await _context.ProductTypes.ToListAsync();
        }

        public async Task<bool> ProductExist(int id)
        {
            return await _context.Products.AnyAsync(p => p.Id == id);   
        }

        public async Task<IActionResult> UpdateProductType(ProductType productType)
        {
            _context.Entry(productType).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await ProductExist(productType.Id))
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
