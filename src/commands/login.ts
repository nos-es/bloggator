import { setUser } from "src/config";

export function loginHandler(cmdName: string, ...args: string[]) {
  if (cmdName !== "login" || args.length === 0) {
    throw Error("Missing login arguments");
  }
  const username: string = args[0];
  setUser(username);
  console.log("Logged in: " + username);
}
