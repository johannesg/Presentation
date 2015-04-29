using System;
using System.Web.Http;
using Billing.Commands;

namespace Frontend.Controllers
{
  public class BillingController : WebshopController
  {
    public class ConfirmOrderRequest
    {
      public Guid CustomerId { get; set; }
      public Guid OrderId { get; set; }
      public string Name { get; set; }
      public string Street { get; set; }
      public string ZipCode { get; set; }
      public string City { get; set; }
    }

    [HttpPost]
    public void ConfirmOrder([FromBody] ConfirmOrderRequest request )
    {
      Bus.Send(new SetBillingAddress
      {
        CustomerId = request.CustomerId,
        OrderId = request.OrderId,
        Name = request.Name,
        Street = request.Street,
        ZipCode = request.ZipCode,
        City = request.City
      });
    }
  }
}