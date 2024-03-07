using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly CSDLContext _context;
        public WishlistRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task CreateWishList(WishList wishList)
        {
            await _context.WishLists.AddAsync(wishList);
        }

        public async Task DeleteWishList(int id)
        {
            var wishlist = await _context.WishLists.FindAsync(id);
            if (wishlist != null)
            {
                _context.WishLists.Remove(wishlist);
            }
        }
        public async Task<IEnumerable<WishList>> GetWishList(string userId)
        {
            return await _context.WishLists
        .Include(wl => wl.Phone)
        .Where(wl => wl.UserId == userId)
        .ToListAsync();
        }

        public async Task<IEnumerable<WishList>> GetWishLists()
        {
            return await _context.WishLists.Include(wl => wl.User)
                .Include(wl => wl.Phone).ToListAsync();
        }

        public async Task<IActionResult> UpdateWishList(WishList wishList)
        {
            _context.Entry(wishList).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await WishListExist(wishList.Id))
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

        public async Task<bool> WishListExist(int id)
        {
            return await _context.WishLists.AnyAsync(b => b.Id == id);
        }
    }
}
