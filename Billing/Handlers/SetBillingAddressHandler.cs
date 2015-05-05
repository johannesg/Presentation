using System.Reflection;
using System.Threading;
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
      Logger.InfoFormat("Order {0}: Setting billing address on customer {1}", message.OrderId, message.CustomerId);

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

      Thread.Sleep(1000);

      Bus.SendLocal(new CheckCreditRating(message.CustomerId, message.OrderId));
    }
  }
}
