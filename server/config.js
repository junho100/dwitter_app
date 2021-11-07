import dotenv from "dotenv";

dotenv.config();

const config = {
  host: {
    port: process.env.PORT,
  },
  jwt: {
    priv: process.env.PRIV_KEY,
  },
};

export default config;