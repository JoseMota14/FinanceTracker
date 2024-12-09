using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using Shared.Bus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Shared
{
    public class RabbitMQEventBus : IEventBus, IDisposable
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly Dictionary<string, List<Type>> _handlers;
        private readonly RabbitMQSettings _settings;

        public RabbitMQEventBus(RabbitMQSettings settings)
        {
            _settings = settings;
            var factory = new ConnectionFactory
            {
                HostName = settings.HostName,
                UserName = settings.UserName,
                Password = settings.Password
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _handlers = new Dictionary<string, List<Type>>();

            _channel.ExchangeDeclare(
                exchange: _settings.ExchangeName,
                type: ExchangeType.Topic);
        }

        public async Task PublishAsync<T>(T @event) where T : BaseEvent
        {
            var message = JsonSerializer.Serialize(@event);
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(
                exchange: _settings.ExchangeName,
                routingKey: @event.GetType().Name,
                basicProperties: null,
                body: body);
        }

        public async Task SubscribeAsync<T>(Func<T, Task> handler) where T : BaseEvent
        {
            var eventName = typeof(T).Name;
            var queueName = $"{eventName}_queue";

            _channel.QueueDeclare(
                queue: queueName,
                durable: true,
                exclusive: false,
                autoDelete: false);

            _channel.QueueBind(
                queue: queueName,
                exchange: _settings.ExchangeName,
                routingKey: eventName);

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (sender, args) =>
            {
                var body = args.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var @event = JsonSerializer.Deserialize<T>(message);

                try
                {
                    await handler(@event);
                    _channel.BasicAck(args.DeliveryTag, false);
                }
                catch (Exception)
                {
                    _channel.BasicNack(args.DeliveryTag, false, true);
                }
            };

            _channel.BasicConsume(
                queue: queueName,
                autoAck: false,
                consumer: consumer);
        }

        public void Dispose()
        {
            _channel?.Dispose();
            _connection?.Dispose();
        }
    }
}
