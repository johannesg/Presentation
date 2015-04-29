using System.Reflection;
using System.Threading;
using Inventory.Events;
using NServiceBus;
using NServiceBus.Logging;
using Ordering.Events;

namespace Inventory.Handlers
{
  public class OrderIsValidHandler : IHandleMessages<OrderIsValid>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(OrderIsValid message)
    {
      Logger.InfoFormat("Order {0}: A minion is out in the field looking for items...", message.OrderId);
      Thread.Sleep(5000);
      Logger.InfoFormat("Order {0}: All items collected.", message.OrderId);

      Bus.Publish(new ItemsPackaged(message.OrderId));
    }
  }
}