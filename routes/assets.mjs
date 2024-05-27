import Path from "path"
import { dirname } from "../support.mjs"
import inert from "@hapi/inert"

export default async (server) => {
  await server.register(inert)

  return server.route({
    method: "GET",
    path: "/assets/{param*}",
    handler: function (req, h) {
      return h.file(Path.join(dirname, "assets", req.params.param))
    },
  })
}
