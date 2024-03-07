using System.Text.Json.Serialization;

namespace DoAnMonHoc_Backend.Models
{
    public class Image
    {
        public int  Id { get; set; }
        public string HinhPublicId { get; set; }
        public string  Url { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
    }
}
