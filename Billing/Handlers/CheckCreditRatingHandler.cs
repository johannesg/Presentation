using System.Reflection;
using Billing.Commands;
using Billing.Events;
using NServiceBus;
using NServiceBus.Logging;

namespace Billing.Handlers
{
  public class CheckCreditRatingHandler : IHandleMessages<CheckCreditRating>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(CheckCreditRating message)
    {
      Logger.InfoFormat("Order {0}: Checking credit rating on customer {1}", message.OrderId, message.CustomerId);

      Bus.Publish(new CustomerIsValid(message.CustomerId, message.OrderId));
    }
  }
}