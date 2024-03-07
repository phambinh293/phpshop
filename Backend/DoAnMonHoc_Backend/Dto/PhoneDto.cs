using DoAnMonHoc_Backend.Models;

namespace DoAnMonHoc_Backend.Dto
{
    public class PhoneDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public string LoaiMan { get; set; }
        public string KichThuoc { get; set; }
        public string DoPhanGiai { get; set; }
        public string CPU { get; set; }
        public string RAM { get; set; }
        public string ROM { get; set; }
        public string CameraTruoc { get; set; }
        public string CameraSau { get; set; }
        public string Pin { get; set; }
        public int SoLuong { get; set; }
        public bool Status { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        //public List<Product> Products { get; set; }
        public string HinhPublicId { get; set; }
        public string FileHinh { get; set; }
        public int[] productTypeIds { get; set; }
    }
}
