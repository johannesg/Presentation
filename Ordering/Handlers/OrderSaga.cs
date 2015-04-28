using System.Reflection;
using NServiceBus;
using NServiceBus.Logging;
using NServiceBus.Saga;
using Ordering.Events;
using Shipping.Events;
using Billing.Events;
using Inventory.Events;

namespace Ordering.Handlers
{
  public class OrderSaga : Saga<OrderSagaData>
    , IAmStartedByMessages<CustomerIsValid>
    , IAmStartedByMessages<AllItemsAreInStock>
    , IAmStartedByMessages<RecipientHasValidAddress>
    , IAmStartedByMessages<RecipientHasInvalidAddress>
    , IHandleMessages<ItemsPackaged>
    , IHandleMessages<OrderShipped>
    , IHandleMessages<OrderHasBeenBilled>
  {
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    protected override void ConfigureHowToFindSaga(SagaPropertyMapper<OrderSagaData> mapper)
    {
      mapper.ConfigureMapping<CustomerIsValid>(m => m.OrderId).ToSaga(s => s.OrderId);
      mapper.ConfigureMapping<AllItemsAreInStock>(m => m.OrderId).ToSaga(s => s.OrderId);
      mapper.ConfigureMapping<RecipientHasValidAddress>(m => m.OrderId).ToSaga(s => s.OrderId);
      mapper.ConfigureMapping<RecipientHasInvalidAddress>(m => m.OrderId).ToSaga(s => s.OrderId);
      mapper.ConfigureMapping<ItemsPackaged>(m => m.OrderId).ToSaga(s => s.OrderId);
      mapper.ConfigureMapping<OrderShipped>(m => m.OrderId).ToSaga(s => s.OrderId);
      mapper.ConfigureMapping<OrderHasBeenBilled>(m => m.OrderId).ToSaga(s => s.OrderId);
    }

    public void Handle(CustomerIsValid message)
    {
      Data.CustomerIsValid = true;

      ValidateOrder();
    }

    public void Handle(RecipientHasValidAddress message)
    {
      Data.RecipientHasValidAddress = true;

      ValidateOrder();
    }

    public void Handle(RecipientHasInvalidAddress message)
    {
      throw new System.NotImplementedException();
    }

    public void Handle(AllItemsAreInStock message)
    {
      Data.AllItemsAreInStock = true;

      ValidateOrder();
    }

    private void ValidateOrder()
    {
      if (!Data.CustomerIsValid || !Data.RecipientHasValidAddress || !Data.AllItemsAreInStock)
        return;

      Bus.Publish(new OrderIsValid(Data.OrderId));
    }

    public void Handle(ItemsPackaged message)
    {
    }

    public void Handle(OrderShipped message)
    {
    }

    public void Handle(OrderHasBeenBilled message)
    {
      Logger.InfoFormat("All done for order {0}. Completing saga", message.OrderId);
      MarkAsComplete();
    }
  }
}