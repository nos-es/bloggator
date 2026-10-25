import { loginHandler } from "./commands/login";
import { registerHandler } from "./commands/register";
import { resetHandler } from "./commands/reset";

function getCommands(): Record<string, Command> {
  return {
    login: {
      name: "login",
      handler: loginHandler,
    },
    register: {
      name: "register",
      handler: registerHandler,
    },
    reset: {
      name: "reset",
      handler: resetHandler,
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
  await command.handler(cmdName, ...args);
}
