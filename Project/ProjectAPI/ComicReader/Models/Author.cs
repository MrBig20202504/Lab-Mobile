using System.ComponentModel.DataAnnotations;

namespace ComicReader.Models
{
    public class Author
    {
        [Key]
        public int AuthorId { get; set; }
        public required string Name { get; set; }
    }
}
