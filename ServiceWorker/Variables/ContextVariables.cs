using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceWorker.Variables
{
    public class ContextVariables
    {
        public static Queue<(DateTime time, BaseEvent ev)> Queue { get; set; }

    }
}
