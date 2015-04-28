using System;
using System.Collections.Concurrent;

namespace Billing.Model
{
  public static class DataStore
  {
    static DataStore()
    {
      Customers = new ConcurrentDictionary<Guid, Customer>();
      Orders = new ConcurrentDictionary<Guid, OrderInfo>();
    }

    public static ConcurrentDictionary<Guid, Customer> Customers { get; set; }
    public static ConcurrentDictionary<Guid, OrderInfo> Orders { get; set; }
  }
}