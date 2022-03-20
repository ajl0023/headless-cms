
process.on("SIGTERM", () => {
  console.log(234);
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log(234);
    debug("HTTP server closed");
  });
});
