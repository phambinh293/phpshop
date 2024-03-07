using System.Text.Json.Serialization;

namespace DoAnMonHoc_Backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public int SoldQuantity { get; set; }
        public int AverageRating { get; set; }
        public int PhoneId { get; set; }
        //[JsonIgnore]
        public Phone Phone { get; set; }
        public int CapacityId { get; set; }
        public Capacity Capacity { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public bool Status { get; set; }
        public List<Image> Images { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Rating> Ratings { get; set; }
        //public List<Cart> Carts { get; set; }
        //public List<WishList> WishLists { get; set; }
        //public List<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
