import Hapi from "@hapi/hapi"
import Path from "path"
import { dirname } from "../support.mjs"

export default Hapi.server({
  port: 3000,
  host: "localhost",
  routes: {
    files: {
      relativeTo: Path.join(dirname, "assets")
    },
  },
})
