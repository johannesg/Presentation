using System;

namespace Inventory.Commands
{
  public class CollectItems
  {
    public Guid OrderId { get; set; }

    public CollectItems(Guid orderId)
    {
      OrderId = orderId;
    }
  }
}