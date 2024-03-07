using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IProductTypeRepository
    {
        Task CreateProductType(ProductType productType);
        Task<IEnumerable<ProductType>> GetProductTypes();
        Task<ProductType> GetProductType(int id);
        Task<bool> ProductExist(int id);
        Task<IActionResult> UpdateProductType(ProductType productType);
        Task DeleteProductType(int id);
    }
}
