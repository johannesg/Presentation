using System.Reflection;
using Billing.Commands;
using Billing.Model;
using NServiceBus;
using NServiceBus.Logging;

namespace Billing.Handlers
{
  public class SetBillingAddressHandler : IHandleMessages<SetBillingAddress>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(SetBillingAddress message)
    {
      Logger.InfoFormat("Setting billing address on customer {0} for order {1}", message.CustomerId, message.OrderId);

      var newCustomer = new Customer
      {
        CustomerId = message.CustomerId,
        Name = message.Name,
        Street = message.Street,
        ZipCode = message.ZipCode,
        City = message.City
      };

      var newOrder = new OrderInfo
      {
        OrderId = message.OrderId,
        CustomerId = message.CustomerId,
        Name = message.Name,
        Street = message.Street,
        ZipCode = message.ZipCode,
        City = message.City
      };

      DataStore.Customers.AddOrUpdate(message.CustomerId, newCustomer, (guid, customer) => newCustomer);
      DataStore.Orders.AddOrUpdate(message.OrderId, newOrder, (guid, order) => newOrder);

      Bus.SendLocal(new CheckCreditRating(message.CustomerId, message.OrderId));
    }
  }
}
