using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceWorker.Utils
{
    public static class Initialize
    {
        public static void DoJob() 
        {
            Variables.ContextVariables.Queue = new Queue<(DateTime time, Shared.BaseEvent ev)> ();
        }
    }
}
