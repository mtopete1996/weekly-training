"use strict"

import dayjs from "dayjs"
import server from "./config/server.mjs"
import assets from "./routes/assets.mjs"
import views from "./config/views.mjs"
import routines from "./assets/routines.json"

const weekday = dayjs().format("dddd")

const exercises = () => {

  if (routines[weekday.toLocaleLowerCase()].isRestDay) {
    return []
  }

  return routines[weekday.toLocaleLowerCase()].exercises
}

const init = async () => {
  await assets(server)
  await views(server)

  server.route({
    method: "GET",
    path: "/",
    handler: function (_req, h) {
      return h.view("index", { weekday, exercises: exercises() })
    },
  })

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
