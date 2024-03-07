using DoAnMonHoc_Backend.Models;

namespace DoAnMonHoc_Backend.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public int SoldQuantity { get; set; }
        public int AverageRating { get; set; }
        public int PhoneId { get; set; }
        public Phone Phone { get; set; }
        public int CapacityId { get; set; }
        public Capacity Capacity { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public bool Status { get; set; }
        public List<Image> Images { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
