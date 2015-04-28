using System;

namespace Shipping.Commands
{
  public class SetDeliveryAddress
  {
    public Guid CustomerId { get; set; }
    public Guid OrderId { get; set; }

    public string Name { get; set; }
    public string Street { get; set; }
    public string ZipCode { get; set; }
    public string City { get; set; }
  }
}