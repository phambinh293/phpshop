using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideshowsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public SlideshowsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet("Admin")]
        public async Task<IActionResult> GetSlideshows()
        {
            var sildeshows = await _uow.SlideshowRepository.GetSlideshows();
            return Ok(sildeshows);
        }

        [HttpGet]
        public async Task<IActionResult> GetSlideshowsForPresent()
        {
            var sildeshows = await _uow.SlideshowRepository.GetSlideshowsForPresent();
            return Ok(sildeshows);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddSlideShow(Slideshow slideshow)
        {
            return await _uow.SlideshowRepository.CreateSlideshow(slideshow);
        }
        [HttpDelete]
        [Route("{slideshowId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSlideShow (int slideshowId)
        {
            var slideshow = await _uow.SlideshowRepository.GetSlideshow(slideshowId);
            if(slideshow == null)
            {
                return NotFound();
            }
            await _uow.SlideshowRepository.DeleteSlideshow(slideshowId);
            var save = await _uow.SaveAsync();
            if (!save)
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSlideShow(int id)
        {
            var slideshow = await _uow.SlideshowRepository.GetSlideshow(id);
            if (slideshow == null)
            {
                return NotFound();
            }
            await _uow.SlideshowRepository.UpdateSlideshow(id);
            var save = await _uow.SaveAsync();
            if (!save)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
