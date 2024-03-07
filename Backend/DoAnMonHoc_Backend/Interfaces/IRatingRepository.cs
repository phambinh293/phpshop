using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IRatingRepository
    {
        Task<IActionResult> CreateRating(Rating rating);
        Task<IEnumerable<Rating>> GetRatings(int productId);
        Task<Rating> GetRating(int id);
        Task<bool> RatingExist(int id);
        Task<IActionResult> UpdateRating(Rating rating);
        Task DeleteRating(int id);
    }
}
