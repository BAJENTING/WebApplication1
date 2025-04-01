using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using WebApplication1.Data;

namespace WebApplication1.Pages
{
    public class SignupModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public SignupModel(ApplicationDbContext context)
        {
            _context = context;
            FullName = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
            ConfirmPassword = string.Empty;
        }

        [BindProperty]
        [Required]
        public string FullName { get; set; }

        [BindProperty]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [BindProperty]
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [BindProperty]
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var user = new User
            {
                FullName = FullName,
                Email = Email,
                Password = Password
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return RedirectToPage("/Index");
        }
    }
}
