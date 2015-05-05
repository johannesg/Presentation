using System.Reflection;
using System.Threading;
using Billing.Events;
using Billing.Model;
using NServiceBus;
using NServiceBus.Logging;
using Shipping.Events;

namespace Billing.Handlers
{
  public class OrderShippedHandler : IHandleMessages<OrderShipped>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(OrderShipped message)
    {
      Logger.InfoFormat("Order {0}: Order has been shipped. Send invoice to the specified billing address", message.OrderId);

      var billingAddress = DataStore.Orders[message.OrderId];

      SendInvoice(billingAddress);

      Bus.Publish(new OrderHasBeenBilled(message.OrderId));
    }

    private void SendInvoice(OrderInfo billingAddress)
    {
      Thread.Sleep(1000);
    }
  }
}