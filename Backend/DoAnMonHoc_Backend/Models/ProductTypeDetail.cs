namespace DoAnMonHoc_Backend.Models
{
    public class ProductTypeDetail
    {
        public int Id { get; set; }
        public int PhoneId { get; set; }
        public Phone Phone { get; set; }
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
    }
}
