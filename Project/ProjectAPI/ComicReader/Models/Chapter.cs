using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ComicReader.Models
{
    public class Chapter
    {
        [Key]
        public int ChapterId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [JsonIgnore] // Prevent serialization of foreign key
        public int ComicId { get; set; }

        [ForeignKey("ComicId")]
        public Comic Comic { get; set; }

        public ICollection<Page> Pages { get; set; } = new List<Page>();

        public DateTime ReleaseDate { get; set; } = DateTime.Now;
    }
}
