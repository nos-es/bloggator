import { readConfig, setUser } from "./config";

function main() {
  setUser("Ethem");

  const config = readConfig();
  console.log(config);
}

main();
