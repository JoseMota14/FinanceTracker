namespace TransactionWebApi.Exceptions
{
    public class UnauthorizedException : Exception
    {
        public UnauthorizedException(string expcetion): base(expcetion) { }
    }
}
