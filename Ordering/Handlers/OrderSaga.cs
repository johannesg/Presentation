using System.Reflection;
using NServiceBus;
using NServiceBus.Logging;
using NServiceBus.Saga;
using Ordering.Commands;
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
    , IAmStartedByMessages<ConfirmOrder>
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
      mapper.ConfigureMapping<ConfirmOrder>(m => m.OrderId).ToSaga(s => s.OrderId);
    }

    public void Handle(CustomerIsValid message)
    {
      Data.OrderId = message.OrderId;
      Data.CustomerIsValid = true;

      Logger.InfoFormat("Order {0}: Customer is valid", Data.OrderId);

      ValidateOrder();
    }

    public void Handle(RecipientHasValidAddress message)
    {
      Data.OrderId = message.OrderId;
      Data.RecipientHasValidAddress = true;

      Logger.InfoFormat("Order {0}: Recipient has a valid address", Data.OrderId);

      ValidateOrder();
    }

    public void Handle(RecipientHasInvalidAddress message)
    {
      Data.OrderId = message.OrderId;
      throw new System.NotImplementedException();
    }

    public void Handle(AllItemsAreInStock message)
    {
      Data.OrderId = message.OrderId;
      Data.AllItemsAreInStock = true;

      Logger.InfoFormat("Order {0}: All items are in stock", Data.OrderId);

      ValidateOrder();
    }

    public void Handle(ConfirmOrder message)
    {
      Data.OrderId = message.OrderId;
      Data.OrderConfirmed = true;

      ValidateOrder();
    }

    private void ValidateOrder()
    {
      if (!Data.CustomerIsValid || !Data.RecipientHasValidAddress || !Data.AllItemsAreInStock || !Data.OrderConfirmed)
        return;

      Logger.InfoFormat("Order {0}: Order is valid. Continuing processing", Data.OrderId);

      Bus.Publish(new OrderIsValid(Data.OrderId));
    }

    public void Handle(ItemsPackaged message)
    {
      Logger.InfoFormat("Order {0}: Items have been packaged", Data.OrderId);
    }

    public void Handle(OrderShipped message)
    {
      Logger.InfoFormat("Order {0}: Order shipped to customer", Data.OrderId);
    }

    public void Handle(OrderHasBeenBilled message)
    {
      Logger.InfoFormat("Order {0}: Order billed. Completing saga", Data.OrderId);
      MarkAsComplete();
    }

  }
}