using Microsoft.AspNetCore.Mvc;

namespace Test.Controllers
{
    public class SubscriptionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
