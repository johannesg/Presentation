using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Common;
using NServiceBus;

namespace Frontend
{
  public class Global
  {
    public static ISendOnlyBus Bus { get; set; }
  }

  public class WebApiApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
      AreaRegistration.RegisterAllAreas();
      GlobalConfiguration.Configure(WebApiConfig.Register);
      FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
      RouteConfig.RegisterRoutes(RouteTable.Routes);
      BundleConfig.RegisterBundles(BundleTable.Bundles);

      var configuration = new BusConfiguration();
      configuration.DefineMessageConventions();

      Global.Bus = Bus.CreateSendOnly(configuration);
    }
  }
}
