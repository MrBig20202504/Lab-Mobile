using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ComicReader.Models
{
    public class Page
    {
        [Key]
        public int PageId { get; set; }

        [JsonIgnore] // Prevent serialization of foreign key
        public int ChapterId { get; set; }

        [ForeignKey("ChapterId")]
        public Chapter Chapter { get; set; }

        public int PageNumber { get; set; }

        public string ImageUrl { get; set; }
    }
}
