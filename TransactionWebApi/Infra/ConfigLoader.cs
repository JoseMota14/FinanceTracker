using System.Text;
using System.Xml.Serialization;
using TransactionWebApi.Models;

namespace TransactionWebApi.Infra
{
    public static class ConfigLoader
    {
        private static string FileName = "configs.xml";

        private static Configs _configs;

        public static Configs Config => _configs ?? throw new ArgumentException("File with errors");
        
        public static void Load()
        {
            string loadPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, FileName);

            string fileContent = string.Empty;
            if(!File.Exists(loadPath))
            {
                throw new ArgumentException($"{loadPath} does not exist.");
            }

            fileContent = File.ReadAllText(loadPath);

            XmlSerializer xmlSerializer = new (typeof(Configs));

            using(StringReader sr = new (fileContent))
            {
                _configs = (Configs)xmlSerializer.Deserialize(sr);
            }
        }
    }
}
