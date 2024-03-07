using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IProductRepository
    {
        Task<IActionResult> CreateProduct(Product product);
        Task<IEnumerable<ProductDto>> GetProducts();
        Task<Product> GetProduct(int id);
        Task<Product> GetAProductForUser(int phoneId, int colorId, int capacityId);
        Task<bool> ProductExist(int id);
        Task<IActionResult> UpdateProduct(Product product);
        Task DeleteProduct(int id);
    }
}
