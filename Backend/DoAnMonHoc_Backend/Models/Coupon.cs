using System.Text.Json.Serialization;

namespace DoAnMonHoc_Backend.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public int? DiscountPercent { get; set; }
        public int? DiscountMoney { get; set; }
        public int RequiredTotal { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Quantity { get; set; }
        public bool Status { get; set; }
        //[JsonIgnore]
        //public List<Invoice> Invoices { get;}
    }
}
