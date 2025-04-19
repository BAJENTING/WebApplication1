using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebApplication1.Data;
using WebApplication1.Models;
using System;
using System.Linq;

namespace WebApplication1.Pages
{
    public class ReservationModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public ReservationModel(ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Reservation Reservation { get; set; }

        public void OnGet()
        {
            // Any logic you want to perform on page load, like loading the existing reservations.
        }

        public IActionResult OnPostSubmitReservation()
        {
            if (ModelState.IsValid)
            {
                // Save reservation to database
                _context.Reservations.Add(Reservation);
                _context.SaveChanges();

                return RedirectToPage("/Reservation/Success");  // Redirect to success page after submitting
            }

            return Page();  // Return the same page if validation fails
        }
    }
}
