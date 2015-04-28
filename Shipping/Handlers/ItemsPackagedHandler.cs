using System;
using System.Reflection;
using Inventory.Events;
using NServiceBus;
using NServiceBus.Logging;
using Shipping.Events;
using Shipping.Model;

namespace Shipping.Handlers
{
  public class ItemsPackagedHandler : IHandleMessages<ItemsPackaged>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(ItemsPackaged message)
    {
      var deliveryAddress = DataStore.DeliveryAddresses[message.OrderId];

      PrintDeliveryAddressAndPutItOnPackage(message.OrderId, deliveryAddress);

      ShipOrder(message.OrderId);

      Bus.Publish(new OrderShipped());
    }

    private void PrintDeliveryAddressAndPutItOnPackage(Guid orderId, DeliveryAddress deliveryAddress)
    {
      Logger.InfoFormat("Adding delivery address on the package");
    }

    private void ShipOrder(Guid orderId)
    {
      Logger.InfoFormat("Shipping order {0}", orderId);
    }
  }

}
