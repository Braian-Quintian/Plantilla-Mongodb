import app from "./app.js";
import credentials from "../src/connection/credentials.js";
const { portb, hostnameb } = credentials;
app.listen(portb, hostnameb, () => console.log(`http://${hostnameb}:${portb}`));