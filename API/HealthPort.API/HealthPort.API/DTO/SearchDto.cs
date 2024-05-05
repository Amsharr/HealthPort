using HealthPort.API.Models;

namespace HealthPort.API.DTO
{
    public class SearchDto
    {
        public int? id { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? nicNo { get; set; }
        public string? mobileNo { get; set; }
        public string? email { get; set; }
        public string? username { get; set; }
        public int? specialityid { get; set; }
    }
}
