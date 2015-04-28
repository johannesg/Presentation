using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Billing.Commands
{
  public class SetBillingAddress
  {
    public Guid CustomerId { get; set; }
    public Guid OrderId { get; set; }

    public string Name { get; set; }
    public string Street { get; set; }
    public string ZipCode { get; set; }
    public string City { get; set; }
  }
}
