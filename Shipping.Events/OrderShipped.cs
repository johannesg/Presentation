using System;

namespace Shipping.Events
{
  public class OrderShipped
  {
    public OrderShipped(Guid orderId)
    {
      OrderId = orderId;
    }

    public Guid OrderId { get; set; }
  }
}