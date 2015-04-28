using System;

namespace Shipping.Events
{
  public class RecipientHasValidAddress
  {
    public Guid OrderId { get; set; }

    public RecipientHasValidAddress(Guid orderId)
    {
      OrderId = orderId;
    }
  }
}
