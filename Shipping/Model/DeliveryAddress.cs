using System;

namespace Shipping.Model
{
  public class DeliveryAddress
  {
    public Guid OrderId { get; set; }

    public string Name { get; set; }
    public string Street { get; set; }
    public string ZipCode { get; set; }
    public string City { get; set; }

    public bool IsValid()
    {
      return true;
    }
  }
}