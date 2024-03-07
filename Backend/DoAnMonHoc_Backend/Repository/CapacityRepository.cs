using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class CapacityRepository : ICapacityRepository
    {
        private readonly CSDLContext _context;

        public CapacityRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> CapacityExist(int id)
        {
            return await _context.Capacitys.AnyAsync(c => c.Id == id);
        }

        public async Task CreateCapacity(Capacity capacity)
        {
            await _context.Capacitys.AddAsync(capacity);
        }

        public async Task DeleteCapacity(int id)
        {
            var pt = await GetCapacity(id);

            pt.Status = false;
        }

        public async Task<Capacity> GetCapacity(int id)
        {
            return await _context.Capacitys.FindAsync(id);
        }

        public async Task<IEnumerable<Capacity>> GetCapacities()
        {
            return await _context.Capacitys.ToListAsync();
        }

        public async Task<IActionResult> UpdateCapacity(Capacity capacity)
        {
            _context.Entry(capacity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (!await CapacityExist(capacity.Id))
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

        public async Task<IEnumerable<Capacity>> GetCapacitiesShow()
        {
            return await _context.Capacitys.Where(c => c.Status == true).ToListAsync();
        }

        public async Task<IEnumerable<Capacity>> GetCapacitiesByPhoneId(int id)
        {
            return await _context.Products
                            .Where(p => p.PhoneId == id && p.Capacity.Status == true)
                            .Select(p => p.Capacity)
                            .Distinct()
                            .ToListAsync();
        }
    }
}
