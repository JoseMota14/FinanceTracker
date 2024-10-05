using Microsoft.AspNetCore.Mvc;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.DTO;
using TransactionWebApi.Models;
using TransactionWebApi.Services;

namespace TransactionWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var transactions = await _transactionService.GetAllTransactions();
            return Ok(transactions);
        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetTransactionById(Guid id)
        //{
        //    var transaction = await _transactionService.GetTransactionByIdAsync(id);
        //    if (transaction == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(transaction);
        //}

        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] CreateTransactionDto transaction)
        {
            var newTransaction = await _transactionService.CreateTransaction(transaction);
            return CreatedAtAction(nameof(AddTransaction), new { id = newTransaction.TransactionId }, transaction);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateTransaction(Guid id, [FromBody] Transaction transaction)
        //{
        //    var existingTransaction = await _transactionService.GetTransactionByIdAsync(id);
        //    if (existingTransaction == null)
        //    {
        //        return NotFound();
        //    }
        //    transaction.TransactionId = id;
        //    await _transactionService.UpdateTransactionAsync(transaction);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTransaction(Guid id)
        //{
        //    var transaction = await _transactionService.GetTransactionByIdAsync(id);
        //    if (transaction == null)
        //    {
        //        return NotFound();
        //    }
        //    await _transactionService.DeleteTransactionAsync(id);
        //    return NoContent();
        //}
    }
}
