using System.ComponentModel.DataAnnotations;

namespace ComicReader.Models
{
    public class Genre
    {
        [Key]
        public int GenreId { get; set; }
        public required string Name { get; set; }
    }
}
