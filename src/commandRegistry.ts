import { loginHandler } from "./commands/login";

function getCommands(): Record<string, Command> {
  return {
    login: {
      name: "login",
      handler: loginHandler,
    },
  };
}

type Command = {
  name: string;
  handler: CommandHandler;
};

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export async function runCommand(cmdName: string, ...args: string[]) {
  const commands = getCommands();

  const command = commands[cmdName];

  if (!command) {
    throw new Error("Command not found");
  }
  command.handler(cmdName, ...args);
}
