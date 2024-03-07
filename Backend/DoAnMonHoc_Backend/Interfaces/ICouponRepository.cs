using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface ICouponRepository
    {
        Task<IActionResult> CreateCoupon(Coupon coupon);
        Task<IEnumerable<Coupon>> GetCoupons();
        Task<IEnumerable<Coupon>> GetCouponsActive();
        Task<Coupon> GetCoupon(int id);
        Task<bool> CouponExist(int id);
        Task<Coupon> CheckCoupon(CheckCouponModel checkCoupon);
        Task<IActionResult> UpdateCoupon(Coupon coupon);
        Task DeleteCoupon(int id);
    }
}
