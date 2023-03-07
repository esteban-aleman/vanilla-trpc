import * as http from "http";
import { initTRPC } from "@trpc/server";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";

export type Data = {
  title: string;
};

const data: Data = {
  title: "This title comes from the server with tRPC",
};

//#region trpc
const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  page: publicProcedure.query(() => data),
});

export type AppRouter = typeof appRouter;

const handler = createHTTPHandler({
  router: appRouter,
});
//#endregion trpc

http
  .createServer(function (req, res) {
    //#region cors
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, PUT, PATCH"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Content-Type", "application/json");

    if (req.method === "OPTIONS") {
      res.end();
      return;
    }
    //#endregion cors

    var url = req.url;
    if (url === "/api") {
      res.write(JSON.stringify(data));
      res.end();
    } else if (url?.startsWith("/trpc/")) {
      req.url = req.url?.replace("/trpc", "");
      handler(req, res);
    } else {
      res.write("Other stuff...");
      res.end();
    }
  })
  .listen(3008, function () {
    console.log("server start at port 3008");
  });
