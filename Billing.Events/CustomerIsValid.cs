using System;

namespace Billing.Events
{
  public class CustomerIsValid
  {
    public Guid CustomerId { get; set; }
    public Guid OrderId { get; set; }

    public CustomerIsValid(Guid customerId, Guid orderId)
    {
      CustomerId = customerId;
      OrderId = orderId;
    }
  }
}
