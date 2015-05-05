using System;
using System.Reflection;
using System.Threading;
using NServiceBus;
using NServiceBus.Logging;
using Shipping.Commands;
using Shipping.Events;
using Shipping.Model;

namespace Shipping.Handlers
{
  public class SetDeliveryAddressHandler : IHandleMessages<SetDeliveryAddress>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(SetDeliveryAddress message)
    {
      Logger.InfoFormat("Order {0}: Updating and validating delivery address for", message.OrderId);

      var deliveryAddress = new DeliveryAddress
      {
        OrderId = message.OrderId,
        Name = message.Name,
        Street = message.Street,
        ZipCode = message.ZipCode,
        City = message.City
      };

      DataStore.DeliveryAddresses.AddOrUpdate(message.OrderId, deliveryAddress, (guid, address) => deliveryAddress);

      Thread.Sleep(1000);

      if (deliveryAddress.IsValid())
        Bus.Publish(new RecipientHasValidAddress(message.OrderId));
      else
        Bus.Publish(new RecipientHasInvalidAddress(message.OrderId));
    }
  }

}