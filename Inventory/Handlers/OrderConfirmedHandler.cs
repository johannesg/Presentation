using System.Reflection;
using System.Threading;
using Inventory.Events;
using NServiceBus;
using NServiceBus.Logging;
using Ordering.Events;

namespace Inventory.Handlers
{
  public class OrderConfirmedHandler : IHandleMessages<OrderConfirmed>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(OrderConfirmed message)
    {
      Logger.InfoFormat("Order {0}: In the warehouse looking for items...", message.OrderId);
      Thread.Sleep(5000);
      Logger.InfoFormat("Order {0}: All items collected.", message.OrderId);

      Bus.Publish(new ItemsPackaged(message.OrderId));
    }
  }
}