using System;

namespace Inventory.Events
{
  public class AllItemsAreInStock
  {
    public Guid OrderId { get; set; }

    public AllItemsAreInStock(Guid orderId)
    {
      OrderId = orderId;
    }
  }
}
