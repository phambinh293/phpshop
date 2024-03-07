using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public ProductTypesController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProductType(ProductType productType)
        {
            _uow.ProductTypeRepository.CreateProductType(productType);
            var result = await _uow.SaveAsync();
            if(!result)
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> GetProductTypes()
        {
            var productTypes = await _uow.ProductTypeRepository.GetProductTypes();
            return Ok(productTypes);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProductType(int id)
        {
            var productTypes = await _uow.ProductTypeRepository.GetProductType(id);
            if(productTypes == null)
            {
                return NotFound();
            }
            return Ok(productTypes);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProductType(int id, ProductType productType)
        {
            if(id != productType.Id)
            {
                return BadRequest();
            }
            return await _uow.ProductTypeRepository.UpdateProductType(productType);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProductType(int id)
        {
            var pt = await _uow.ProductTypeRepository.GetProductType(id);
            if(pt == null)
            {
                return NotFound();
            }
            await _uow.ProductTypeRepository.DeleteProductType(id);
            var result = await _uow.SaveAsync();
            return Ok();
        }
    }
}
