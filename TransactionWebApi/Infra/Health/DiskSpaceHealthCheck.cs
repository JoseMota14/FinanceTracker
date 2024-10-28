using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace TransactionWebApi.Infra.Health
{
    public class DiskSpaceHealthCheck : IHealthCheck
    {
        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context,
        CancellationToken cancellationToken = default)
        {
            var driveInfo = new DriveInfo("C:\\");
            var freeSpace = driveInfo.AvailableFreeSpace / 1024 / 1024 / 1024; // GB

            return Task.FromResult(
                freeSpace < 10
                    ? HealthCheckResult.Degraded($"Low disk space: {freeSpace}GB remaining")
                    : HealthCheckResult.Healthy($"Disk space OK: {freeSpace}GB remaining"));
        }
    }
}
