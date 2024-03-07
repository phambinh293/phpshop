using AutoMapper;
using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class PhoneRepository : IPhoneRepository
    {
        private readonly CSDLContext _context;
        private readonly IMapper _mapper;

        public PhoneRepository(CSDLContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IActionResult> CreatePhone(PhoneDto phoneDto)
        {
            var check = await _context.Phones.FirstOrDefaultAsync(p => p.Name == phoneDto.Name);
            if (check != null)
            {
                return new BadRequestObjectResult("Da ton tai!!!");
            }
            var phone = _mapper.Map<Phone>(phoneDto);
            await _context.Phones.AddAsync(phone);
            var result = await _context.SaveChangesAsync();
            if (result <= 0)
            {
                return new BadRequestObjectResult("Khong luu duoc!!!");
            }
            if (phoneDto.productTypeIds != null)
            {
                var getPhone = await _context.Phones.FirstOrDefaultAsync(p => p.Name == phone.Name);
                foreach (var prodTypeId in phoneDto.productTypeIds)
                {
                    var prodTypeDetail = new ProductTypeDetail
                    {
                        PhoneId = getPhone.Id,
                        ProductTypeId = prodTypeId,
                    };
                    await _context.ProductTypeDetails.AddAsync(prodTypeDetail);
                }
                var result2 = await _context.SaveChangesAsync();
                if (result2 <= 0)
                {
                    return new BadRequestObjectResult("Khong luu duoc!!!");
                }
            }
            return new OkResult();
        }

        public async Task DeletePhone(int id)
        {
            var pt = await GetPhone(id);

            pt.Status = false;
        }

        public async Task<Phone> GetPhone(int id)
        {
            return await _context.Phones.Include(p => p.Brand)
                .Include(p => p.Products)
                .Include(p => p.Products)
                    .ThenInclude(p => p.Capacity)
                .Include(p => p.Products)
                    .ThenInclude(p => p.Color)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Phone> GetPhoneByName(string name)
        {
            return await _context.Phones
                .Include(p => p.Brand)
                .Include(p => p.Products)
                .FirstOrDefaultAsync(p => p.Name == name);
        }

        public async Task<IEnumerable<Phone>> GetPhones()
        {
            return await _context.Phones.Include(p => p.Brand)
                .Include(p => p.Products)

                .ToListAsync();
        }

        public async Task<IEnumerable<Phone>> GetPhonesByBrand(int brandId)
        {
            return await _context.Phones
                    .Include(p => p.Brand)
                    .Include(p => p.Products)
                    .Where(p => p.BrandId == brandId)
                    .ToListAsync();
        }

        public async Task<IEnumerable<Phone>> GetPhonesShow()
        {
            return await _context.Phones.Where(p => p.Status == true)
                .ToListAsync(); ;
        }

        public async Task<bool> PhoneExist(int id)
        {
            return await _context.Phones.AnyAsync(b => b.Id == id);
        }

        public async Task<IActionResult> UpdatePhone(PhoneDto phoneDto)
        {
            var phone = _mapper.Map<Phone>(phoneDto);
            _context.Entry(phone).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await PhoneExist(phone.Id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }
            if (phoneDto.productTypeIds != null)
            {
                foreach (var prodTypeId in phoneDto.productTypeIds)
                {
                    var checkProdTypeExist = await _context.ProductTypeDetails
                        .FirstOrDefaultAsync(p => p.PhoneId == phoneDto.Id && p.ProductTypeId == prodTypeId);
                    if (checkProdTypeExist != null)
                    {
                        continue;
                    }
                    var prodTypeDetail = new ProductTypeDetail
                    {
                        PhoneId = phoneDto.Id,
                        ProductTypeId = prodTypeId,
                    };
                    await _context.ProductTypeDetails.AddAsync(prodTypeDetail);
                }
                var listProductType = await _context.ProductTypeDetails
                    .Where(p => p.PhoneId == phoneDto.Id).ToListAsync();
                foreach (var productTypeDetail in listProductType)
                {
                    var checkToDelete = false;
                    foreach (var prodTypeId in phoneDto.productTypeIds)
                    {
                        if (productTypeDetail.ProductTypeId == prodTypeId)
                        {
                            checkToDelete = false;
                            break;
                        }
                        if (productTypeDetail.ProductTypeId != prodTypeId)
                        {
                            checkToDelete = true;
                        }
                    }
                    if (checkToDelete == true)
                    {
                        _context.ProductTypeDetails.Remove(productTypeDetail);
                    }
                }

            }
            var result = await _context.SaveChangesAsync();
            return new OkResult();
        }
    }
}
