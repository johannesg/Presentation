using System;

namespace Billing.Events
{
  public class OrderHasBeenBilled
  {
    public Guid OrderId { get; set; }

    public OrderHasBeenBilled(Guid orderId)
    {
      OrderId = orderId;
    }
  }
}