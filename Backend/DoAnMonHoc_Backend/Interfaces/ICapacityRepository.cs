using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface ICapacityRepository
    {
        Task CreateCapacity(Capacity capacity);
        Task<IEnumerable<Capacity>> GetCapacities();
        Task<IEnumerable<Capacity>> GetCapacitiesByPhoneId(int id);
        Task<IEnumerable<Capacity>> GetCapacitiesShow();
        Task<Capacity> GetCapacity(int id);
        Task<bool> CapacityExist(int id);
        Task<IActionResult> UpdateCapacity(Capacity capacity);
        Task DeleteCapacity(int id);
    }
}
