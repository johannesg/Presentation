using System;
using System.Collections.Generic;
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
    public void ConfirmOrder([FromBody] ConfirmOrderRequest request)
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

    [HttpGet]
    public object Prices()
    {
      return Data;
    }

    private static readonly object Data = new List<object>
      {
        new {Id = 1, Price = 100},
        new {Id = 2, Price = 400},
        new {Id = 3, Price = 10},
        new {Id = 4, Price = 50}
      };
  }
}