using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StripeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequest paymentRequest)
        {
            StripeConfiguration.ApiKey = _configuration["StripeSetting:SecretKey"];

            var options = new ChargeCreateOptions
            {
                Amount = paymentRequest.Amount,
                Currency = "vnđ",
                Description = paymentRequest.Description,
                Source = paymentRequest.Token // Stripe token from client-side
            };

            var service = new ChargeService();
            var charge = await service.CreateAsync(options);

            // Xử lý kết quả thanh toán ở đây
            // ...

            return Ok();
        }
        [HttpPost]
        [Route("Payment")]
        public async Task<IActionResult> Payment(List<PaymentModel> paymentModels)
        {
            var domain = "http://localhost:3000/";

            // Chuyển đổi danh sách sản phẩm thành danh sách line items
            var lineItems = paymentModels.Select(paymentModel => new SessionLineItemOptions
            {
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = "usd",
                    UnitAmount = paymentModel.Price / 23000,
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = paymentModel.ProductName,
                    },
                },
                Quantity = paymentModel.Quantity,
            }).ToList();
            var options = new SessionCreateOptions
            {
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = domain + "thanhcong",
                CancelUrl = domain + "cart/thanh-toan",
            };
            var service = new SessionService();
            Session session = service.Create(options);

            //Response.Headers.Add("Location", session.Url);
            Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:3000");

            // Trả về URL của phiên thanh toán
            return Ok(new { url = session.Url });
        }
    }
}
