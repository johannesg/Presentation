using System;

namespace Shipping.Events
{
  public class RecipientHasInvalidAddress
  {
    public Guid OrderId { get; set; }

    public RecipientHasInvalidAddress(Guid orderId)
    {
      OrderId = orderId;
    }
  }
}