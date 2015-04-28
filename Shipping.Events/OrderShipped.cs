using System;

namespace Shipping.Events
{
  public class OrderShipped
  {
    public Guid OrderId { get; set; }
  }
}