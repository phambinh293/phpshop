using AutoMapper;
using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Models;

namespace DoAnMonHoc_Backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Brand, BrandDto>().ReverseMap();
            CreateMap<Color, ColorDto>().ReverseMap();
            CreateMap<Phone, PhoneDto>().ReverseMap();
        }
    }
}
