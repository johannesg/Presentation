using System;
using System.Linq;
using System.Web.Http;
using Inventory.Commands;

namespace Frontend.Controllers
{
  public class InventoryController : WebshopController
  {
    public class ConfirmOrderRequest
    {
      public class OrderedItem
      {
        public int ArticleId { get; set; }
        public int Count { get; set; }
      }

      public Guid OrderId { get; set; }
      public OrderedItem[] Items { get; set; }
    }

    [HttpPost]
    public void ConfirmOrder([FromBody] ConfirmOrderRequest request)
    {
      Bus.Send(new CheckInventory
      {
        OrderId = request.OrderId,
        Items = request.Items.Select(x => new CheckInventory.OrderedItem()
        {
          ArticleId = x.ArticleId,
          Count = x.Count
        }).ToArray()
      });
    }
  }
}