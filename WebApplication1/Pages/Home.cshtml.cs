using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;

namespace WebApplication1.Pages
{
    public class HomeModel : PageModel
    {
        public IActionResult OnPostLogout()
        {
            HttpContext.SignOutAsync();
            return RedirectToPage("/Index");
        }

    }
}
