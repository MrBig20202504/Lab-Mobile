using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; // Ensure to include this namespace for [JsonIgnore]

namespace ComicReader.Models
{
    public class Comic
    {
        [Key]
        public int ComicId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        public string Description { get; set; }

        [JsonIgnore] // Prevent serialization of foreign key
        public int AuthorId { get; set; }

        [ForeignKey("AuthorId")]
        public Author Author { get; set; }

        [JsonIgnore] // Prevent serialization of foreign key
        public int GenreId { get; set; }

        [ForeignKey("GenreId")]
        public Genre Genre { get; set; }

        public string CoverImage { get; set; }

        public DateTime PublishDate { get; set; } = DateTime.Now;

        public string Status { get; set; }

        public ICollection<Chapter> Chapters { get; set; } = new List<Chapter>();
    }
}
