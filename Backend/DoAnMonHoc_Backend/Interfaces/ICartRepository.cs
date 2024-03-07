using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface ICartRepository
    {
        Task<IActionResult> CreateCart(Cart cart);
        Task<IEnumerable<Cart>> GetCarts(string userId);
        Task<Cart> GetCart(int id);
        Task<bool> CartExist(string userId, int productId);
        Task<IActionResult> UpdateCart(Cart cart);
        Task<IActionResult> DeleteCart(int id);
    }
}
