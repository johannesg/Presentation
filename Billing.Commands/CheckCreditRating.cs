using System;

namespace Billing.Commands
{
  public class CheckCreditRating
  {
    public Guid CustomerId { get; set; }
    public Guid OrderId { get; set; }

    public CheckCreditRating(Guid customerId, Guid orderId)
    {
      CustomerId = customerId;
      OrderId = orderId;
    }
  }
}