import { MongoClient } from "mongodb";
import credentials from "./credentials.js";
export async function connect() {
  try {
    const uri = `mongodb+srv://${credentials.userDB}:${credentials.passDB}@${credentials.cluster}.mongodb.net/${credentials.dbDB}`;
    const client = await MongoClient.connect(uri);
    return client.db();
  } catch (error) {
    return { status: 500, message: error.message };
  }
}