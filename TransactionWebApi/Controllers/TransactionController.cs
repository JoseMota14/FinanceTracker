using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.DTO;
using TransactionWebApi.Models;
using TransactionWebApi.Services;
using TransactionWebApi.Utils;

namespace TransactionWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(Transaction), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ResponseCache(Duration = 60)]
        public async Task<IActionResult> GetAllTransactions()
        {
            var token = ControllerUtils.ExtractUserFromAuth(Request.Headers);
            var transactions = await _transactionService.GetAllTransactions(token);
            return Ok(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] CreateTransactionDto transaction)
        {
            var token = ControllerUtils.ExtractUserFromAuth(Request.Headers);
            var newTransaction = await _transactionService.CreateTransaction(transaction, token);
            return CreatedAtAction(nameof(AddTransaction), new { id = newTransaction.TransactionId }, transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(Guid id, [FromBody] UpdateTransactionDto transaction)
        {
            await _transactionService.UpdateTransaction(id, transaction);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id)
        {
            var transaction = await _transactionService.GetTransactionById(id);
            if (transaction == null)
            {
                return NotFound();
            }
            await _transactionService.DeleteTransactionById(id);
            return NoContent();
        }
    }
}
