using System.Web.Http;
using NServiceBus;

namespace Frontend.Controllers
{
  public abstract class WebshopController : ApiController
  {
    public ISendOnlyBus Bus { get { return Global.Bus; } }
    
  }
}