const dotenv = require("dotenv");
dotenv.config();

const constants = {
  clientURL: "http://localhost:3000",
  APIgeneralRoute: "/api",
  defaultPort: process.env.PORT || 3001,
  corsOptions: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
};

export default constants;
