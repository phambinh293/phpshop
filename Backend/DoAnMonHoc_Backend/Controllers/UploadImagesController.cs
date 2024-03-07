using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadImagesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IPhotoService _photoService;

        public UploadImagesController(IUnitOfWork uow, IPhotoService photoService)
        {
            _uow = uow;
            _photoService = photoService;
        }
        [HttpPost]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            var result = await _photoService.UploadPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            var photo = new PhotoModel
            {
                PublicId = result.PublicId,
                Url = result.SecureUrl.ToString()
            };
            return Ok(photo);
        }
        [HttpPost]
        [Route("UploadPhotos")]
        public async Task<IActionResult> UploadPhotos(IEnumerable<IFormFile> files)
        {
            var photoModels = new List<PhotoModel>();

            foreach (var file in files)
            {
                var result = await _photoService.UploadPhotoAsync(file);
                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
                var photo = new PhotoModel
                {
                    PublicId = result.PublicId,
                    Url = result.SecureUrl.ToString()
                };
                photoModels.Add(photo);
            }
            return Ok(photoModels);

        }
        [HttpDelete]
        [Route("{publicId}")]
        public async Task<IActionResult> DeletePhoto(string publicId)
        {
            var result = await _photoService.DeletePhotoAsync(publicId);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
            return Ok(201);
        }
    }
}
