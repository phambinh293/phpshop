using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WishlistsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public WishlistsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetWishlists()
        {
            var wishlists = await _uow.WishlistRepository.GetWishLists();
            return Ok(wishlists);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetWishlist(string id)
        {
            var wishlist = await _uow.WishlistRepository.GetWishList(id);
            return Ok(wishlist);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateWishlist(WishList wishList)
        {
            var checkWishlist = await _uow.WishlistRepository.WishListExist(wishList.Id);
            if (checkWishlist == true)
            {
                return BadRequest();
            }
            _uow.WishlistRepository.CreateWishList(wishList);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateWishList(int id, WishList wishList)
        {
            if (id != wishList.Id)
            {
                return BadRequest();
            }
            return await _uow.WishlistRepository.UpdateWishList(wishList);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            await _uow.WishlistRepository.DeleteWishList(id);
            
            var result = await _uow.SaveAsync();
            if (result == false)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
