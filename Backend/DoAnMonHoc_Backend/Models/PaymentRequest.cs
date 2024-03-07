namespace DoAnMonHoc_Backend.Models
{
    public class PaymentRequest
    {
        public int Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public string Token { get; set; }
    }
}
