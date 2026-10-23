import { runCommand } from "./commandRegistry";

function main() {
  try {
    const argv = process.argv.slice(2);

    if (argv.length === 0) {
      console.error("Missing arguments");
      console.log("Usage: <command_name>");
      process.exit(1);
    }
    const [cmdName, ...args] = argv;

    runCommand(cmdName, ...args);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    process.exit(1);
  }
}

main();
