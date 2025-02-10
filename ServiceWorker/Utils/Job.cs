using Quartz;
using ServiceWorker.Variables;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceWorker.Utils
{
    public class Job : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            ProcessDequeue();
            await Task.CompletedTask;
        }

        private void ProcessDequeue()
        {
            while (ContextVariables.Queue.Count > 0)
            {
                var (time, ev) = ContextVariables.Queue.Dequeue();


            }
        }
    }
}
