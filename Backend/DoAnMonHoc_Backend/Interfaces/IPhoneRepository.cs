using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IPhoneRepository
    {
        Task<IActionResult> CreatePhone(PhoneDto phoneDto);
        Task<IEnumerable<Phone>> GetPhones();
        Task<IEnumerable<Phone>> GetPhonesShow();
        Task<IEnumerable<Phone>> GetPhonesByBrand(int brandId);
        Task<Phone> GetPhone(int id);
        Task<Phone> GetPhoneByName(string name);
        Task<bool> PhoneExist(int id);
        Task<IActionResult> UpdatePhone(PhoneDto phoneDto);
        Task DeletePhone(int id);
    }
}
