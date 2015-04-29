using System;
using NServiceBus.Saga;

namespace Ordering.Handlers
{
  public class OrderSagaData : IContainSagaData
  {
    public Guid Id { get; set; }
    public string Originator { get; set; }
    public string OriginalMessageId { get; set; }

    public Guid OrderId { get; set; }

    public bool CustomerIsValid { get; set; }
    public bool AllItemsAreInStock { get; set; }
    public bool RecipientHasValidAddress { get; set; }
    public bool OrderConfirmed { get; set; }
  }
}
