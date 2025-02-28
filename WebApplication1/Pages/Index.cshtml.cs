using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApplication1.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        public string Email { get; set; }

        [BindProperty]
        public string Password { get; set; }

        public void OnGet()
        {
            // Handle GET request, if needed.
        }

        public IActionResult OnPostLogin()
        {
            // Handle POST request for login (when form is submitted)
            if (ModelState.IsValid)
            {
                // Perform login logic (this is just an example)
                // You would typically check the credentials here and redirect to a different page
                if (Email == "as@userexample.com" && Password == "123")
                {
                    // Redirect to Home page after successful login
                    return RedirectToPage("/Home");
                }
                else
                {
                    // Return error message or re-render the page with error
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return Page();
                }
            }

            return Page();
        }
    }
}

