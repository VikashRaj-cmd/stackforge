import app from "./app.js";
import { PORT } from "./config/config.js";
import connectDB from "./config/database.js";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

