using System;
using System.Text.Json.Serialization;

namespace Server.Model.Entities
{
    public class BaseEntity
    {
        [JsonPropertyOrder(100)]
        public DateTime Created_at { get; set; } = DateTime.Now;
        [JsonPropertyOrder(101)]
        public DateTime? Updated_at { get; set; } = null;
        [JsonPropertyOrder(102)]
        public DateTime? Deleted_at { get; set; } = null;
    }
}
