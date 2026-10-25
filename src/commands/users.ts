import { readConfig } from "src/config";
import { getUsers } from "src/lib/db/queries/users";

export async function usersHandler(cmdName: string): Promise<void> {
  if (cmdName !== "users") {
    throw Error("Wrong command for this handler.");
  }
  const config = readConfig();
  const users = await getUsers();

  if (!users) {
    console.log("No users registered");
  }
  for (const user of users) {
    let userName = user.name;

    if (userName === config.currentUserName) {
      userName += " (current)";
    }

    console.log(`* ${userName}`);
  }
}
