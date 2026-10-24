import { setUser } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export async function loginHandler(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (cmdName !== "login" || args.length === 0) {
    throw Error("Missing login arguments");
  }
  const username: string = args[0];
  const existingUserName = await getUserByName(username);

  if (!existingUserName) {
    throw Error("User with this name does not exists");
  }

  setUser(username);
  console.log("Logged in: " + username);
}
