using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Bus
{
    public interface IEventBus
    {
        Task PublishAsync<T>(T @event) where T : BaseEvent;
        Task SubscribeAsync<T>(Func<T, Task> handler) where T : BaseEvent;
    }
}
