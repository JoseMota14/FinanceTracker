namespace TransactionWebApi.Utils
{
    public static class ControllerUtils
    {
        public static string ExtractUserFromAuth(IHeaderDictionary headers)
        {
            headers.TryGetValue("Authorization", out var authorizationHeader);

            if (authorizationHeader.ToString() is not null)
            {
                return authorizationHeader.ToString().Replace("Bearer ", string.Empty);
            }

            throw new UnauthorizedAccessException("No authorization");
        }
    }
}
