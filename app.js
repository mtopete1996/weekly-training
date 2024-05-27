"use strict"

const Hapi = require("@hapi/hapi")
const Path = require("path")
const dayjs = require("dayjs")
const Handlebars = require("handlebars")

const server = Hapi.server({
  port: 3000,
  host: "localhost",
  routes: {
    files: {
      relativeTo: Path.join(__dirname, "assets"),
    },
  },
})

const weekday = dayjs().format("dddd")

const exercises = () => {
  const routines = require("./assets/routines.json")

  if (routines[weekday.toLocaleLowerCase()].isRestDay) {
    return []
  }

  return routines[weekday.toLocaleLowerCase()].exercises
}

const init = async () => {
  await server.register(require("@hapi/vision"))
  await server.register(require("@hapi/inert"))

  server.route({
    method: "GET",
    path: "/assets/{param*}",
    handler: function (req, h) {
      return h.file(Path.join(__dirname, "assets", req.params.param))
    },
  })

  server.views({
    engines: {
      html: Handlebars,
    },
    relativeTo: __dirname,
    path: "templates",
    layout: true,
    layoutPath: "templates/layouts",
  })

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