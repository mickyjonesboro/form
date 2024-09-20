import app from "./app.js";
import { disconnectPrisma } from "./config/prisma.js";
const port = process.env.PORT || 5000;

// Handle Shutdown

const gracefulShutdown = async () => {
  await disconnectPrisma();
  console.log("Shutting down gracefully.....");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

app.listen(port, () => {
  console.log(`Server is started in ${port}`);
});
