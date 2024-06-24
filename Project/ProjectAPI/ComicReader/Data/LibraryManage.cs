using ComicReader.Models;
using Microsoft.EntityFrameworkCore;

namespace ComicReader.Data
{
    public class LibraryManage : DbContext
    {
        public LibraryManage(DbContextOptions<LibraryManage> options) : base(options)
        {
        }

        public DbSet<Comic> Comics { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Page> Pages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entity relationships here if needed
            modelBuilder.Entity<Comic>()
                .HasMany(c => c.Chapters)
                .WithOne(ch => ch.Comic)
                .HasForeignKey(ch => ch.ComicId);

            modelBuilder.Entity<Chapter>()
                .HasMany(ch => ch.Pages)
                .WithOne(p => p.Chapter)
                .HasForeignKey(p => p.ChapterId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
