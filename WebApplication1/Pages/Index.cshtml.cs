using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Linq;
using WebApplication1.Data;

public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public IndexModel(ApplicationDbContext context)
    {
        _context = context;
        Email = string.Empty;
        Password = string.Empty;
    }

    [BindProperty]
    public string Email { get; set; }

    [BindProperty]
    public string Password { get; set; }

    public IActionResult OnPostLogin()
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == Email && u.Password == Password);
        if (user != null)
        {
            // Handle successful login
            return RedirectToPage("/Home");
        }

        // Handle login failure
        ModelState.AddModelError(string.Empty, "Invalid login attempt.");
        return Page();
    }
}
