//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ComicReader.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Comment
    {
        public int comment_id { get; set; }
        public int comic_id { get; set; }
        public int user_id { get; set; }
        public string content { get; set; }
        public Nullable<System.DateTime> comment_date { get; set; }
    
        public virtual Comic Comic { get; set; }
        public virtual User User { get; set; }
    }
}
