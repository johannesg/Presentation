using System.Reflection;
using System.Threading;
using Inventory.Commands;
using Inventory.Events;
using NServiceBus;
using NServiceBus.Logging;

namespace Inventory.Handlers
{
  public class CheckInventoryHandler : IHandleMessages<CheckInventory>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(CheckInventory message)
    {
      // Check that all items are in stock
      Logger.InfoFormat("Order {0}: Checking that all items are in stock", message.OrderId);

      Thread.Sleep(1000);

      Bus.Publish(new AllItemsAreInStock(message.OrderId));
    }
  }
}