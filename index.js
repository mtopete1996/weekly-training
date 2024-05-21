"use strict";

const Hapi = require("@hapi/hapi");
const Path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "assets"),
      },
    },
  });

  await server.register(require("@hapi/vision"));
  await server.register(require('@hapi/inert'));

  server.route({
    method: "GET",
    path: "/assets/{param*}",
    handler: function (req, h) {
      return h.file(Path.join(__dirname, "assets", req.params.param));
    },
  });

  server.views({
    engines: {
      html: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "templates",
    layout: true,
    layoutPath: "templates/layouts",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: function (_req, h) {
      return h.view("index", { title: 'hello!'});
    }
  });

  await server.start();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
