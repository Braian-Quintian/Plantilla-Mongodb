/* eslint-disable no-undef */
import { loadEnv } from "vite";
const env = loadEnv("development", process.cwd(), "VITE");
const credentials = {
  hostnamef: env.VITE_FRONT_HOST,
  portf: env.VITE_FRONT_PORT,
  hostnameb: env.VITE_BACK_HOST,
  portb: env.VITE_BACK_PORT,
  secret: env.VITE_ATLAS_SECRET,
  userDB: env.VITE_ATLAS_USER,
  passDB: env.VITE_ATLAS_PASS,
  cluster: env.VITE_ATLAS_CLUSTER,
  dbDB: env.VITE_ATLAS_DB,
};

export default credentials;