using System;

namespace Inventory.Events
{
  public class ItemsPackaged
  {
    public Guid OrderId { get; set; }

    public ItemsPackaged(Guid orderId)
    {
      OrderId = orderId;
    }
  }
}