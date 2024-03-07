using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IColorRepository
    {
        Task<IActionResult> CreateColor(Color color);
        Task<IEnumerable<Color>> GetColors();
        Task<IEnumerable<Color>> GetColorsByPhoneId(int id);
        Task<IEnumerable<Color>> GetColorsShow();
        Task<Color> GetColor(int id);
        Task<bool> ColorExist(int id);
        Task<IActionResult> UpdateColor(Color color);
        Task DeleteColor(int id);
    }
}
