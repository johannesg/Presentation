﻿using System;

namespace Billing.Model
{
  public class Customer
  {
    public Guid CustomerId { get; set; }
    public string Name { get; set; }
    public string Street { get; set; }
    public string ZipCode { get; set; }
    public string City { get; set; }
  }
}