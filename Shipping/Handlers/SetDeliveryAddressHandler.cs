using System;
using System.Reflection;
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
      Logger.InfoFormat("Updating and validating delivery address for order {0}", message.OrderId);

      var deliveryAddress = new DeliveryAddress
      {
        OrderId = message.OrderId,
        Name = message.Name,
        Street = message.Street,
        ZipCode = message.ZipCode,
        City = message.City
      };

      DataStore.DeliveryAddresses.AddOrUpdate(message.OrderId, deliveryAddress, (guid, address) => deliveryAddress);

      if (deliveryAddress.IsValid())
        Bus.Publish(new RecipientHasValidAddress(message.OrderId));
      else
        Bus.Publish(new RecipientHasInvalidAddress(message.OrderId));
    }
  }

}