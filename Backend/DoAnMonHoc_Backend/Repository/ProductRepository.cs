using AutoMapper;
using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly CSDLContext _context;
        private readonly IMapper _mapper;

        public ProductRepository(CSDLContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IActionResult> CreateProduct(Product product)
        {
            var checkExist = await _context.Products
                .FirstOrDefaultAsync(p => 
                p.PhoneId == product.PhoneId && 
                p.CapacityId == product.CapacityId &&
                p.ColorId == product.ColorId);
            if (checkExist != null)
            {
                return new BadRequestObjectResult("Da ton tai!!!");
            }
            await _context.Products.AddAsync(product);
            var getPhone = await _context.Phones.FirstOrDefaultAsync(p => p.Id == product.PhoneId);
            getPhone.SoLuong += product.Quantity;
            if(getPhone.Price < product.Price)
            {
                getPhone.Price = product.Price;
            }
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
            {
                return new BadRequestObjectResult("Khong luu duoc!!!");
            }
            return new OkResult();
        }

        public async Task DeleteProduct(int id)
        {
            var pt = await GetProduct(id);

            pt.Status = false;
            var phone = await _context.Phones.FirstOrDefaultAsync(p => p.Id == pt.PhoneId);
            if (phone != null)
            {
                phone.SoLuong -= pt.Quantity;
            }
        }

        public async Task<Product> GetAProductForUser(int phoneId, int colorId, int capacityId)
        {
            return await _context.Products
                    .Include(p => p.Color)
                    .Include(p => p.Capacity)
                    .Include(p => p.Comments)
                        .ThenInclude(c => c.ChildComments)
                    .Include(p => p.Images)
                    .Include(p => p.Ratings)
                    .FirstOrDefaultAsync(P => P.PhoneId == phoneId && P.ColorId == colorId && P.CapacityId == capacityId);
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products
                        .Include(p => p.Capacity)
                        .Include(p => p.Color)
                        .Include(p => p.Images)
                        .Include(p => p.Comments)
                        .Include(p => p.Ratings)
                        .Include(p => p.Phone)
                        .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            return await _context.Products
                        .Include(p => p.Capacity)
                        .Include(p => p.Color)
                        .Include(p => p.Images)
                        .Include(p => p.Comments)
                        .Include(p => p.Ratings)
                        .Include(p => p.Phone)
                        .Select(p => new ProductDto
                        {
                            Id = p.Id,
                            Price = p.Price,
                            Quantity = p.Quantity,
                            Status = p.Status,
                            Phone = new Phone
                            {
                                Id = p.Phone.Id,
                                Name = p.Phone.Name,
                                ROM = p.Phone.ROM
                            },
                            Capacity = new Capacity
                            {
                                Id = p.Capacity.Id,
                                TotalCapacity = p.Capacity.TotalCapacity,
                            },
                            Color = new Color
                            {
                                Id = p.Color.Id,
                                ColorName = p.Color.ColorName
                            }
                        })
                        .ToListAsync(); 
        }

        public async Task<bool> ProductExist(int id)
        {
            return await _context.Products.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdateProduct(Product product)
        {
            var product1 = await _context.Products.FindAsync(product.Id);
            var phone = await _context.Phones.FindAsync(product1.PhoneId);
            Console.WriteLine("=======Product " + product.Quantity);
            Console.WriteLine("=======product1 " + product1.Quantity);
            if (phone.Price > product.Price || phone.Price <= 0)
            {
                phone.Price = product.Price;
            }

            if (product.Quantity < product1.Quantity)
            {
                phone.SoLuong -= product1.Quantity - product.Quantity;
            }
            else
            {
                phone.SoLuong += product.Quantity - product1.Quantity;
            }
            if(product1 != null)
            {
                product1.Quantity = product.Quantity;
                product1.Price = product.Price;
                product1.SoldQuantity = product.SoldQuantity;
                product1.AverageRating = product.AverageRating;
                product1.PhoneId = product.PhoneId;
                product1.CapacityId = product.CapacityId;
                product1.ColorId = product.ColorId;
                product1.Status = product.Status;
                product1.Images = product.Images;
                product1.Comments = product.Comments;
                product1.Ratings = product.Ratings;
            }

            _context.Entry(phone).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return new OkResult();
            }
            catch (Exception ex)
            {
                if (!await ProductExist(product.Id))
                {
                    return new BadRequestResult();
                }
                else
                {
                    throw;
                }
            }

        }
    }
}
