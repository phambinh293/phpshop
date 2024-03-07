using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IPhotoService _photoService;
        public PhonesController(IUnitOfWork uow, IPhotoService photoService)
        {
            _uow = uow;
            _photoService = photoService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPhones()
        {
            var phones = await _uow.PhoneRepository.GetPhones();
            return Ok(phones);
        }
        [HttpGet]
        [Route("GetPhonesShow")]
        public async Task<IActionResult> GetPhonesShow()
        {
            var phones = await _uow.PhoneRepository.GetPhonesShow();
            return Ok(phones);
        }
        [HttpGet]
        [Route("GetPhoneByBrand/{brandId}")]
        public async Task<IActionResult> GetPhoneByBrand(int brandId)
        {
            var phones = await _uow.PhoneRepository.GetPhonesByBrand(brandId);
            return Ok(phones);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPhone(int id)
        {
            var phone = await _uow.PhoneRepository.GetPhone(id);
            return Ok(phone);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreatePhone(PhoneDto phoneDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Không hợp lệ");
            }
            return await _uow.PhoneRepository.CreatePhone(phoneDto);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePhone(int id, PhoneDto phoneDto)
        {
            if (id != phoneDto.Id)
            {
                return BadRequest();
            }
            return await _uow.PhoneRepository.UpdatePhone(phoneDto);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePhone(int id)
        {
            var pt = await _uow.PhoneRepository.PhoneExist(id);
            if (pt == false)
            {
                return NotFound();
            }
            await _uow.PhoneRepository.DeletePhone(id);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpPost]
        [Route("add/photo/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddPhonePhoto(int id, IFormFile file)
        {
            var result = await _photoService.UploadPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var phone = await _uow.PhoneRepository.GetPhone(id);
            if (phone != null && result != null && result.SecureUrl != null)
            {
                phone.FileHinh = result.SecureUrl.ToString();
                phone.HinhPublicId = result.PublicId;
            }
            await _uow.SaveAsync();
            return Ok(201);
        }
        [HttpPost]
        [Route("delete-photo/{phoneId}/{publicId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePhonePhoto(int phoneId, string publicId)
        {
            var phone = await _uow.PhoneRepository.GetPhone(phoneId);
            if (phone == null || phone.HinhPublicId != publicId)
            {
                return BadRequest();
            }
            var result = await _photoService.DeletePhotoAsync(phone.HinhPublicId);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            phone.FileHinh = "";
            phone.HinhPublicId = "";
            await _uow.SaveAsync();
            return Ok(201);
        }
    }
}
