import cors from "cors"
import express from "express"
import { STORE_SERVER_PORT } from "./configuration.js"
import {
  getStore,
  initializeStore,
  setStore
} from "./in-memory-store.node.js"

const app = express()

app.use(cors({
  origin: [
    "http://localhost:8100",
  ]
}))
app.use(express.json())

app.get("*", (_req, res) => res.json(getStore()))
app.post("*", (req, res) => {
  setStore(req.body)
  res.json(getStore())
})

app.listen(STORE_SERVER_PORT, () => {
  console.log(`Store server is running on port ${STORE_SERVER_PORT}.`)
  initializeStore()
})

export { }
