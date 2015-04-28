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
      Logger.InfoFormat("Checking credit rating on customer {0} for order {1}", message.CustomerId, message.OrderId);

      Bus.Publish(new CustomerIsValid(message.CustomerId, message.OrderId));
    }
  }
}