using NServiceBus;

namespace Common
{
  public static class MessageConventions
  {
    public static BusConfiguration DefineMessageConventions(this BusConfiguration configuration)
    {
      configuration.Conventions()
        .DefiningCommandsAs(x => x.Namespace.EndsWith(".Commands"))
        .DefiningEventsAs(x => x.Namespace.EndsWith(".Events"))
        .DefiningMessagesAs(x => x.Namespace.EndsWith(".Messages"));

      return configuration;
    }
  }
}
