using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NServiceBus;
using NServiceBus.Logging;
using Shipping.Commands;

namespace Shipping.Handlers
{
  class ShipOrderHandler : IHandleMessages<ShipOrder>
  {
    public void Handle(ShipOrder message)
    {
      var logger = LogManager.GetLogger(GetType());
      logger.Info("Ship it!");
    }
  }
}
