using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApplication1.Pages
{
    public class FAQModel : PageModel
    {
         public List<FaqItem> Faqs { get; set; }

        public void OnGet()
        {
            Faqs = new List<FaqItem>
        {
            new FaqItem { Question = "How do I report maintenance issues?", Answer = "You can report maintenance issues by contacting the HOA office or submitting a request online." },
            new FaqItem { Question = "How can I get involved in the HOA or community events?", Answer = "Check the community board or website for upcoming events and volunteer opportunities." },
            new FaqItem { Question = "Who do I contact in case of an emergency?", Answer = "In case of an emergency, call 911 or contact the community security office." },
            new FaqItem { Question = "How do I access amenities like the pool, gym, or clubhouse?", Answer = "Amenities are accessible using a resident key card. Contact management for assistance." },
            new FaqItem { Question = "What happens if I violate a community rule?", Answer = "Violations are reviewed by the HOA, and penalties may apply based on severity." },
            new FaqItem { Question = "How does billing work?", Answer = "Billing is handled monthly. You can pay online or at the management office." }
        };
        }
    }
}
public class FaqItem
{
    public string Question { get; set; }
    public string Answer { get; set; }
}
