using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly CSDLContext _context;

        public CartRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<bool> CartExist(string userId, int productId)
        {
            return await _context.Carts
                .AnyAsync(c => c.UserId == userId && c.ProductId == productId);
        }

        public async Task<IActionResult> CreateCart(Cart cart)
        {
            var checkCart = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == cart.UserId && c.ProductId == cart.ProductId);
            if(checkCart != null)
            {
                checkCart.Quantity += 1;
                await _context.SaveChangesAsync(); 
                return new OkResult();
            }
            if(cart.Quantity <= 0)
            {
                return new BadRequestObjectResult("So luong phai >= 0!!!");
            }
            var product = await _context.Products.FindAsync(cart.ProductId);
            if(product.Price <= 0)
            {
                return new BadRequestObjectResult("Da het hang!!!");
            }
            await _context.Carts.AddAsync(cart);
            var result = await _context.SaveChangesAsync();
            if(result >=0)
            {
                product.Quantity -= cart.Quantity;
                var phone = await _context.Phones.FindAsync(product.PhoneId);
                phone.SoLuong -= cart.Quantity;
                var result2 = await _context.SaveChangesAsync();
                if(result2 <= 0)
                {
                    return new BadRequestObjectResult("Khong luu duoc!!!");
                }
                return new OkResult();
            }
            return new BadRequestObjectResult("Khong luu duoc!!!");
        }

        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if(cart == null)
            {
                return new BadRequestObjectResult("Khong ton tai!!!");
            }
            var product = await _context.Products.FindAsync(cart.ProductId);
            var phone = await _context.Phones.FindAsync(product.PhoneId);
            product.Quantity += cart.Quantity;
            phone.SoLuong += cart.Quantity;
            _context.Carts.Remove(cart);
            var result = await _context.SaveChangesAsync();
            if(result < 0)
            {
                return new BadRequestObjectResult("Khong luu duoc");
            }
            return new OkResult();
        }

        public async Task<Cart> GetCart(int id)
        {
            return await _context.Carts
                .Include(c => c.Product)
                .ThenInclude(p => p.Color)
                .Include(c => c.Product)
                .ThenInclude(p => p.Capacity)
                .Include(c => c.Product)
                .ThenInclude(p => p.Images)
                .FirstOrDefaultAsync(c => c.Id == id);  
        }

        public async Task<IEnumerable<Cart>> GetCarts(string userId)
        {
            return await _context.Carts
                .Include(c => c.Product)
                .ThenInclude(p => p.Color)
                .Include(c => c.Product)
                .ThenInclude(p => p.Capacity)
                .Include(c => c.Product)
                .ThenInclude(p => p.Images)
                .Include(c => c.Product)
                .ThenInclude(p => p.Phone)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }

        public async Task<IActionResult> UpdateCart(Cart cart)
        {
            var getCart = await GetCart(cart.Id);
            var product = await _context.Products.FindAsync(cart.ProductId);
            if(cart.Quantity > product.Quantity)
            {
                return new BadRequestObjectResult("So luong vuot qua cho phep!!!");
            }
            var phone = await _context.Phones.FindAsync(product.PhoneId);
            if (getCart.Quantity < cart.Quantity)
            {
                product.Quantity -=  cart.Quantity - getCart.Quantity;
                phone.SoLuong -= cart.Quantity - getCart.Quantity;
            }
            else
            {
                product.Quantity += getCart.Quantity - cart.Quantity;
                phone.SoLuong += getCart.Quantity - cart.Quantity;
            }
            getCart.Quantity = cart.Quantity;
            var result =  await _context.SaveChangesAsync();
            if (result < 0)
            {
                return new BadRequestObjectResult("Khong luu duoc");
            }
            return new OkResult();
        }
    }
}
