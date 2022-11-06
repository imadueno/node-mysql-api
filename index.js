// APP entry point
import { config } from 'dotenv'
import app from "./src/app.js"

// start dotenv
config()

// init server
app.listen(process.env.PORT || 3000)
console.log("server listen on port", process.env.PORT || 3000);