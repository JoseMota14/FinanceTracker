namespace Shared
{
    public abstract class BaseEvent
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }
        public string EventType => GetType().Name;
    }
}