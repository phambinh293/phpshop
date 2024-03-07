using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class RatingRepository : IRatingRepository
    {
        private readonly CSDLContext _context;
        public RatingRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> CreateRating(Rating rating)
        {
            var kt = await _context.InvoiceDetails
                .AnyAsync(c => c.Invoice.UserId == rating.UserId && c.ProductId == rating.ProductId);
            if(kt == false)
            {
                return new BadRequestObjectResult("Chưa mua hàng!!!");
            }
            var check = await _context.Ratings
                .FirstOrDefaultAsync(r => r.UserId == rating.UserId && r.ProductId == rating.ProductId);
            if(check != null)
            {
                return new BadRequestObjectResult("Chỉ được đánh giá 1 lần!!!");
            }
            var product = await _context.Products.FindAsync(rating.ProductId);
            product.AverageRating = (int) (product.AverageRating + rating.Star)/2;
            await _context.Ratings.AddAsync(rating);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkResult();
            }
            return new BadRequestObjectResult("Something went wrong!!!");
        }

        public async Task DeleteRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating != null)
            {
                _context.Ratings.Remove(rating);
            }
        }

        public async Task<Rating> GetRating(int id)
        {
            return await _context.Ratings.Include(i => i.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Rating>> GetRatings(int productId)
        {
            return await _context.Ratings.Include(i => i.User)
                .Where(c => c.ProductId == productId)
                .ToListAsync();
        }

        public async Task<bool> RatingExist(int id)
        {
            return await _context.Ratings.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdateRating(Rating rating)
        {
            _context.Entry(rating).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (!await RatingExist(rating.Id))
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
    }
}
