using System;

namespace Ordering.Events
{
    public class OrderIsValid
    {
      public OrderIsValid(Guid orderId)
      {
        OrderId = orderId;
      }

      public Guid OrderId { get; set; }
    }
}
