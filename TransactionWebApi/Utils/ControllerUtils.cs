using System.Globalization;

namespace TransactionWebApi.Utils
{
    public static class ControllerUtils
    {
        private const string AUTH = "Authorization";
        private const string LANG = "Language";

        public static string ExtractUserFromAuth(IHeaderDictionary headers)
        {
            headers.TryGetValue(AUTH, out var authorizationHeader);

            if (authorizationHeader.ToString() is not null)
            {
                return authorizationHeader.ToString().Replace("Bearer ", string.Empty);
            }

            throw new UnauthorizedAccessException("No authorization");
        }

        public static string CultureAddOn(this IHeaderDictionary headers)
        {
            headers.TryGetValue(LANG, out var languageHeader);

            if(languageHeader.ToString() is not null)
            {
                return languageHeader!;
            }

            return "pt-PT";
        }
    }
}
