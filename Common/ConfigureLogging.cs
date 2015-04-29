using NLog;
using NLog.Config;
using NLog.Targets;
using NServiceBus;

namespace Common
{
  public static class ConfigureLogging
  {
    public static void NLog()
    {
      NServiceBus.Logging.LogManager.Use<NLogFactory>();

      var config = new LoggingConfiguration();

      var infoTarget = new ColoredConsoleTarget
      {
        Layout = "${message}${newline}"
      };

      infoTarget.WordHighlightingRules.Add(new ConsoleWordHighlightingRule()
      {
        Regex = @"^Order\s+[a-fA-F0-9]+-[a-fA-F0-9]+-[a-fA-F0-9]+-[a-fA-F0-9]+-[a-fA-F0-9]+\s*:",
        ForegroundColor = ConsoleOutputColor.Yellow
      });
      infoTarget.WordHighlightingRules.Add(new ConsoleWordHighlightingRule()
      {
        Regex = @"^Order\s+[a-fA-F0-9]+-[a-fA-F0-9]+-[a-fA-F0-9]+-[a-fA-F0-9]+-[a-fA-F0-9]+\s*:(.*)",
        ForegroundColor = ConsoleOutputColor.Cyan
      });

      var errorTarget = new ColoredConsoleTarget
      {
        Layout = "${level}|${logger}|${message}${onexception:${newline}${exception:format=tostring}}"
      };

      config.AddTarget("console", infoTarget);
      var infoRule = new LoggingRule("*", infoTarget);
      infoRule.EnableLoggingForLevel(LogLevel.Info);
      config.LoggingRules.Add(infoRule);

      config.AddTarget("errors", errorTarget);
      config.LoggingRules.Add(new LoggingRule("*", LogLevel.Warn, errorTarget));

      LogManager.Configuration = config;
    }
  }
}