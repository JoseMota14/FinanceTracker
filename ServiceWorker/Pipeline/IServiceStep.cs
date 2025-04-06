using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceWorker.Pipeline
{
    public interface IServiceStep
    {
        Task ExecuteStep(PipelineContext context, CancellationToken cancellationToken);
    }
}
