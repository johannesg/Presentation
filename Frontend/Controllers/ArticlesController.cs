using System.Collections.Generic;
using System.Web.Http;

namespace Frontend.Controllers
{
  public class ArticlesController : ApiController
  {
    public object Get()
    {
      return Data;
    }

    private static readonly object Data = new List<object>
      {
        new {Id = 1, Description = "Kodapa", ImageUrl = "/Content/kodapa.jpg"},
        new {Id = 2, Description = "Elit kodapa", ImageUrl = "/Content/evil-monkey.jpg"},
        new {Id = 3, Description = "Bananer", ImageUrl = "/Content/bananer.jpg"},
        new {Id = 4, Description = "Projektledare", ImageUrl = "/Content/drhobo3.gif"}
      };
  }
}
