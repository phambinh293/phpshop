using DoAnMonHoc_Backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DoAnMonHoc_Backend.Dto
{
    public class InvoiceDetailsDto
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        [JsonIgnore]
        public Invoice Invoice { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public ProductDto Product { get; set; }
        public int Quantity { get; set; }
        public int TotalPrice { get; set; }
    }
}
