using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceWorker.Pipeline
{
    public class ServicePipeline
    {
        private readonly List<IServiceStep> _serviceSteps;

        public ServicePipeline(IEnumerable<IServiceStep> steps)
        {
            _serviceSteps = steps.ToList();
        }

        public async Task RunAsync(string variable, CancellationToken cts)
        {
            using var context = new PipelineContext { };

            foreach (var step in _serviceSteps)
            {
                await step.ExecuteStep(context, cts);
            }
        }
    }
}
