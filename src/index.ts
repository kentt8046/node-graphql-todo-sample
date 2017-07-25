import * as cluster from "cluster";
import { createServer } from "./server";

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  createServer()
    .then(server => {
      server.listen(3000);
      console.log(":3000");
    });
}
