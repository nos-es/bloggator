import { setUser } from "src/config";
import { createUser, getUserByName } from "src/lib/db/queries/users";

export async function registerHandler(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (cmdName !== "register" || args.length === 0) {
    throw Error("Missing register arguments");
  }
  try {
    const username: string = args[0];
    const existingUserName = await getUserByName(username);

    if (existingUserName) {
      throw Error("User with this name already exists");
    }

    const result = await createUser(username);

    if (!result) {
      throw Error("User could not be registered.");
    }

    setUser(result.name);

    console.log(`${result.name} has been registered successfully`);

  } catch (err) {
    throw err;
  }
}
