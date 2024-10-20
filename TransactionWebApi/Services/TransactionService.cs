using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.CQRS.Queries;
using TransactionWebApi.DTO;

namespace TransactionWebApi.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly IConfiguration _configuration;

        public TransactionService(ICommandDispatcher commandDispatcher, IQueryDispatcher queryDispatcher, IConfiguration configuration)
        {
            _commandDispatcher = commandDispatcher;
            _queryDispatcher = queryDispatcher;
            _configuration = configuration;
        }

        public async  Task<IEnumerable<TransactionDto>> GetAllTransactions(string token)
        {
            string user = GetEmailFromClaims(token);

            var transactions = await _queryDispatcher.Dispatch<GetAllTransactionsQuery, IEnumerable<TransactionDto>>(new GetAllTransactionsQuery(user));
            return transactions;
        }

        public async Task<TransactionDto> GetTransactionById(Guid transactionId)
        {
            var transaction = await _queryDispatcher.Dispatch<GetTransactionByIdQuery, TransactionDto>(new GetTransactionByIdQuery(transactionId));
            return transaction;
        }

        public async Task<TransactionDto> CreateTransaction(CreateTransactionDto dto, string token)
        {

            dto.UserId = GetEmailFromClaims(token);

            var transaction = await _commandDispatcher.Dispatch<CreateTransactionCommand, TransactionDto>(new CreateTransactionCommand(dto));
            return transaction;
        }

        public async Task<TransactionDto> UpdateTransaction(Guid id, UpdateTransactionDto dto)
        {
            var transaction = await _commandDispatcher.Dispatch<UpdateTransactionCommand, TransactionDto>(new UpdateTransactionCommand(id, dto));
            return transaction;
        }

        public async Task<bool> DeleteTransactionById(Guid transactionId)
        {
            await _commandDispatcher.Dispatch<DeleteTransactionCommand, bool>(new DeleteTransactionCommand(transactionId));
            return true;
        }


        private string GetEmailFromClaims(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"])),
                ValidateLifetime = false // You might want to validate the lifetime in production
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

                if (!(securityToken is JwtSecurityToken jwtSecurityToken) ||
                    !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                var emailClaim = principal.FindFirst(ClaimTypes.Email);
                if (emailClaim != null)
                {
                    return emailClaim.Value;
                }

                throw new SecurityTokenException("Email claim not found");
            }
            catch (Exception ex)
            {
                throw new SecurityTokenException("Token validation failed", ex);
            }
        }

        
    }

}
