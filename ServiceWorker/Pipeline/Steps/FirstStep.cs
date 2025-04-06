using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceWorker.Pipeline.Steps
{
    internal class FirstStep : IServiceStep
    {
        public Task ExecuteStep(PipelineContext context, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
