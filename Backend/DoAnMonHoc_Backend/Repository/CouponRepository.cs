using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class CouponRepository : ICouponRepository
    {
        private readonly CSDLContext _context;
        public CouponRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<Coupon> CheckCoupon(CheckCouponModel checkCoupon)
        {
            var coupon = await _context.Coupons
                .FirstOrDefaultAsync(c => c.Code == checkCoupon.Code);
            if(coupon == null || 
                coupon.Quantity <= 0 || 
                coupon.EndDate < checkCoupon.Date || 
                coupon.RequiredTotal > checkCoupon.Money)
            {
                return null;
            }
            return coupon;
        }

        public async Task<bool> CouponExist(int id)
        {
            return await _context.Coupons.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> CreateCoupon(Coupon coupon)
        {
            var checkCoupon = await _context.Coupons
                    .FirstOrDefaultAsync(c => c.Code == coupon.Code);
            if(checkCoupon != null)
            {
                return new BadRequestObjectResult("Đã tồn tại mã khuyến mãi!!!");
            }

            await _context.Coupons.AddAsync(coupon);
            var result = await _context.SaveChangesAsync();
            if(result < 0)
            {
                return new BadRequestResult(); 
            }
            return new OkResult();
        }

        public async Task DeleteCoupon(int id)
        {
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon != null)
            {
                coupon.Status = false;
            }
        }

        public async Task<Coupon> GetCoupon(int id)
        {
            return await _context.Coupons.FirstOrDefaultAsync(c => c.Id == id);
            //return await _context.Coupons.Include(c => c.Invoices)
            //    .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Coupon>> GetCoupons()
        {
            return await _context.Coupons.ToListAsync();
            //return await _context.Coupons.Include(c => c.Invoices)
            //    .ToListAsync();
        }

        public async Task<IEnumerable<Coupon>> GetCouponsActive()
        {
            return await _context.Coupons.Where(c => c.Status == true).ToListAsync();
        }

        public async Task<IActionResult> UpdateCoupon(Coupon coupon)
        {
            _context.Entry(coupon).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await CouponExist(coupon.Id))
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
