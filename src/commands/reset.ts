import { deleteUsers } from "src/lib/db/queries/users";

export async function resetHandler(cmdName: string): Promise<void> {
  if (cmdName !== "reset") {
    throw Error("Wrong command for this handler.");
  }
  await deleteUsers();
  console.log("Users table has been reset");
}
