const Server = require("./models/Server")
require("dotenv").config()

const servidor = new Server()
servidor.listen()
