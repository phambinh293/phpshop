using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public InvoiceDetailsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetInvoiceDetails()
        {
            var invoiceDetails = await _uow.InvoiceDetailRepository.GetInvoiceDetails();
            return Ok(invoiceDetails);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetInvoiceDetail(int id)
        {
            var invoiceDetail = await _uow.InvoiceDetailRepository.GetInvoiceDetail(id);
            return Ok(invoiceDetail);
        }
        [HttpPost]
        public async Task<IActionResult> CreateInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            var checkInvoiceDetail = await _uow.InvoiceDetailRepository.InvoiceDetailExist(invoiceDetail.Id);
            if (checkInvoiceDetail == true)
            {
                return BadRequest();
            }
            _uow.InvoiceDetailRepository.CreateInvoiceDetail(invoiceDetail);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateInvoiceDetail(int id, InvoiceDetail invoiceDetail)
        {
            if (id != invoiceDetail.Id)
            {
                return BadRequest();
            }
            return await _uow.InvoiceDetailRepository.UpdateInvoiceDetail(invoiceDetail);
        }
        [HttpPut]
        [Route("DeleteInvoiceDetail/{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            await _uow.InvoiceDetailRepository.DeleteInvoiceDetail(id);
            var result = await _uow.SaveAsync();
            return Ok();
        }
    }
}
