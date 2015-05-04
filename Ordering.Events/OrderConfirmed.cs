using System;

namespace Ordering.Events
{
    public class OrderConfirmed
    {
      public OrderConfirmed(Guid orderId)
      {
        OrderId = orderId;
      }

      public Guid OrderId { get; set; }
    }
}
