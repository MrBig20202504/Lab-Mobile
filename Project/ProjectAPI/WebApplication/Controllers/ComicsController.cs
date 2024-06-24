using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class ComicsController : ApiController
    {
        private ComicReaderEntities1 db = new ComicReaderEntities1();

        // GET: api/Comics
        public IQueryable<Comic> GetComics()
        {
            return db.Comics;
        }

        // GET: api/Comics/5
        [ResponseType(typeof(Comic))]
        public IHttpActionResult GetComic(int id)
        {
            Comic comic = db.Comics.Find(id);
            if (comic == null)
            {
                return NotFound();
            }

            return Ok(comic);
        }

        // PUT: api/Comics/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComic(int id, Comic comic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comic.ComicId)
            {
                return BadRequest();
            }

            db.Entry(comic).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComicExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Comics
        [ResponseType(typeof(Comic))]
        public IHttpActionResult PostComic(Comic comic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comics.Add(comic);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = comic.ComicId }, comic);
        }

        // DELETE: api/Comics/5
        [ResponseType(typeof(Comic))]
        public IHttpActionResult DeleteComic(int id)
        {
            Comic comic = db.Comics.Find(id);
            if (comic == null)
            {
                return NotFound();
            }

            db.Comics.Remove(comic);
            db.SaveChanges();

            return Ok(comic);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ComicExists(int id)
        {
            return db.Comics.Count(e => e.ComicId == id) > 0;
        }
    }
}