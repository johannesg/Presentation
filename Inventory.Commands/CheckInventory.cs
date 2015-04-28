using System;

namespace Inventory.Commands
{
  public class CheckInventory
  {
    public class OrderedItem
    {
      public int ArticleId { get; set; }
      public int Count { get; set; }
    }

    public Guid OrderId { get; set; }
    public OrderedItem[] Items { get; set; }
  }
}
