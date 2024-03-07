using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IProductTypeDetailRepository
    {
        Task CreateProductTypeDetail(ProductTypeDetail productTypeDetail);
        Task<IEnumerable<ProductTypeDetail>> GetProductTypeDetails();
        Task<IEnumerable<ProductTypeDetail>> GetProductsByProductType(int productTypeId);
        Task<ProductTypeDetail> GetProductTypeDetail(int id);
        Task<IEnumerable<ProductTypeDetail>> GetProductTypeByPhoneId(int phoneId);
        Task<bool> ProductTypeDetailExist(int id);
        Task<bool> CheckExist(int phoneId, int productTypeId);
        Task<IActionResult> UpdateProductTypeDetail(ProductTypeDetail productTypeDetail);
        Task DeleteProductTypeDetail(ProductTypeDetail productTypeDetail);
    }
}
