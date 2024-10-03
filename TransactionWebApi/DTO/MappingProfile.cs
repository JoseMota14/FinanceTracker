using AutoMapper;
using TransactionWebApi.Models;

namespace TransactionWebApi.DTO
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Transaction, TransactionDto>();
            CreateMap<CreateTransactionDto, Transaction>();
            CreateMap<UpdateTransactionDto, Transaction>();
        }
    }

}
