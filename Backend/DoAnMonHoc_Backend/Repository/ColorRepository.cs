using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class ColorRepository : IColorRepository
    {
        private readonly CSDLContext _context;

        public ColorRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> ColorExist(int id)
        {
            return await _context.Colors.AnyAsync(c => c.Id == id);
        }

        public async Task<IActionResult> CreateColor(Color color)
        {
            var check = await _context.Colors.FirstOrDefaultAsync(c => c.ColorName == color.ColorName);
            if(check != null)
            {
                return new BadRequestObjectResult("This color was exsist!!!");
            }
            await _context.Colors.AddAsync(color);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkResult();
            }
            return new BadRequestObjectResult("Something went wrong!!!");
        }

        public async Task DeleteColor(int id)
        {
            var pt = await GetColor(id);
            pt.Status = false;
        }

        public async Task<Color> GetColor(int id)
        {
            return await _context.Colors.FindAsync(id);
        }

        public async Task<IEnumerable<Color>> GetColors()
        {
            return await _context.Colors.ToListAsync();
        }

        public async Task<IEnumerable<Color>> GetColorsByPhoneId(int id)
        {
            return await _context.Products
                            .Where(p => p.PhoneId == id && p.Color.Status == true)
                            .Select(p => p.Color)
                            .Distinct()
                            .ToListAsync();
        }

        public async Task<IEnumerable<Color>> GetColorsShow()
        {
            return await _context.Colors.Where(c => c.Status == true).ToListAsync();
        }

        public async Task<IActionResult> UpdateColor(Color color)
        {
            _context.Entry(color).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await ColorExist(color.Id))
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
