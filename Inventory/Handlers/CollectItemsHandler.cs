using System;
using System.Reflection;
using System.Threading;
using Inventory.Commands;
using Inventory.Events;
using NServiceBus;
using NServiceBus.Logging;

namespace Inventory.Handlers
{
  public class CollectItemsHandler : IHandleMessages<CollectItems>
  {
    public IBus Bus { get; set; }
    public ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

    public void Handle(CollectItems message)
    {
      Logger.Info("A minion is out in the field looking for items...");
      Thread.Sleep(5000);
      Logger.Info("All items collected.");

      Bus.Publish(new ItemsPackaged(message.OrderId));
    }
  }

}