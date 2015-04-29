using System;
using System.Web.Http;
using Ordering.Commands;

namespace Frontend.Controllers
{
  public class OrderingController : WebshopController
  {
    public class ConfirmOrderRequest
    {
      public Guid OrderId { get; set; }
    }
    
    [HttpPost]
    public void ConfirmOrder([FromBody] ConfirmOrderRequest request)
    {
      Bus.Send(new ConfirmOrder
      {
        OrderId = request.OrderId,
      });
    }
  }
}