using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Data
{
    public class CSDLContext : IdentityDbContext<User>
    {
        public CSDLContext(DbContextOptions<CSDLContext> options) : base(options)
        {
        }
        public DbSet<Brand> Brands { get; set; } = default!;
        public DbSet<Capacity> Capacitys { get; set; } = default!;
        public DbSet<Cart> Carts { get; set; } = default!;
        public DbSet<Color> Colors { get; set; } = default!;
        public DbSet<Comment> Comments { get; set; } = default!;
        public DbSet<Coupon> Coupons { get; set; } = default!;
        public DbSet<Image> Images { get; set; } = default!;
        public DbSet<Invoice> Invoices { get; set; } = default!;
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; } = default!;
        public DbSet<Phone> Phones { get; set; } = default!;
        public DbSet<Product> Products { get; set; } = default!;
        public DbSet<ProductType> ProductTypes { get; set; } = default!;
        public DbSet<ProductTypeDetail> ProductTypeDetails { get; set; } = default!;
        public DbSet<Rating> Ratings { get; set; } = default!;
        public DbSet<WishList> WishLists { get; set; } = default!;
        public DbSet<Slideshow> Slideshows { get; set; } = default!;
    }
}
