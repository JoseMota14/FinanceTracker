using System.Xml.Serialization;

namespace TransactionWebApi.Models
{
    [XmlRoot("Configs")]
    public class Configs
    {
        [XmlElement("Jwt")]
        public JWT Jwt { get; set; }
        [XmlElement("AllowedUrl")]
        public string AllowedUrl { get; set; }
        [XmlElement("RateLimiting")]
        public RateLimiting RateLimiting { get; set; }
    }

    public class RateLimiting
    {
        [XmlElement("MaxRequests")]
        public int MaxRequests { get; set; }
        [XmlElement("TimeWindow")]
        public int TimeWindow { get; set; }
    }

    public class JWT
    {
        [XmlElement("Secret")]
        public string Secret { get; set; }
        [XmlElement("Issuer")]
        public string Issuer { get; set; }
        [XmlElement("Audience")]
        public string Audience { get; set; }
    }
}
