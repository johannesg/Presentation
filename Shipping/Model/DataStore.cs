using System;
using System.Collections.Concurrent;

namespace Shipping.Model
{
  public static class DataStore
  {
    static DataStore()
    {
      DeliveryAddresses = new ConcurrentDictionary<Guid, DeliveryAddress>();
    }

    public static ConcurrentDictionary<Guid, DeliveryAddress> DeliveryAddresses  { get; set; }
  }
}