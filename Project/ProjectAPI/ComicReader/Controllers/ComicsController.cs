using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComicReader.Data;
using ComicReader.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ComicReader.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComicsController : ControllerBase
    {
        private readonly LibraryManage _context;

        public ComicsController(LibraryManage context)
        {
            _context = context;
        }

        // GET: api/Comics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetComics()
        {
            var comics = await _context.Comics
                .Include(c => c.Author)
                .Include(c => c.Genre)
                .Include(c => c.Chapters)
                    .ThenInclude(ch => ch.Pages)
                .Select(c => new
                {
                    ComicId = c.ComicId,
                    Title = c.Title,
                    Description = c.Description,
                    CoverImage = c.CoverImage,
                    PublishDate = c.PublishDate,
                    Status = c.Status,
                    Author = new {c.Author.Name }, // Only include AuthorId and Name
                    Genre = new {c.Genre.Name }, // Only include GenreId and Name
                    Chapters = c.Chapters.Select(ch => new
                    {
                        ChapterId = ch.ChapterId,
                        Title = ch.Title,
                        Pages = ch.Pages.Select(p => new
                        {
                            PageId = p.PageId,
                            ImageUrl = p.ImageUrl
                        }).ToList()
                    }).ToList()
                })
                .ToListAsync();

            return comics;
        }

        // GET: api/Comics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetComic(int id)
        {
            var comic = await _context.Comics
                .Include(c => c.Author)
                .Include(c => c.Genre)
                .Include(c => c.Chapters)
                    .ThenInclude(ch => ch.Pages)
                .Select(c => new
                {
                    ComicId = c.ComicId,
                    Title = c.Title,
                    Description = c.Description,
                    CoverImage = c.CoverImage,
                    PublishDate = c.PublishDate,
                    Status = c.Status,
                    Author = new { c.Author.Name }, // Only include AuthorId and Name
                    Genre = new { c.Genre.Name }, // Only include GenreId and Name
                    Chapters = c.Chapters.Select(ch => new
                    {
                        ChapterId = ch.ChapterId,
                        Title = ch.Title,
                        Pages = ch.Pages.Select(p => new
                        {
                            PageId = p.PageId,
                            ImageUrl = p.ImageUrl
                        }).ToList()
                    }).ToList()
                })
                .FirstOrDefaultAsync(c => c.ComicId == id);

            if (comic == null)
            {
                return NotFound();
            }

            return comic;
        }

        // POST: api/Comics
        [HttpPost]
        public async Task<ActionResult<Comic>> PostComic(Comic comic)
        {
            _context.Comics.Add(comic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComic", new { id = comic.ComicId }, comic);
        }

        // DELETE: api/Comics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComic(int id)
        {
            var comic = await _context.Comics.FindAsync(id);
            if (comic == null)
            {
                return NotFound();
            }

            _context.Comics.Remove(comic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComicExists(int id)
        {
            return _context.Comics.Any(e => e.ComicId == id);
        }
    }
}
