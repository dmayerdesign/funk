import cors from "cors"
import express from "express"
import taxonomyTerms from "../../../../../build-pipeline/data/development-data/taxonomy-terms.json"
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
app.use(rawBody)
app.get("/", (_req, res) => res.json({}))

app.post("/cloud-functions/taxonomyGetTermBySlug", (req, res) => {
  console.log("req.body is:", req.body)
  res.json(Object.values(taxonomyTerms).find(({ slug }) => slug === req.rawBody))
})
app.all("/cloud-functions/*", (_req, res) => res.status(200).json())

app.get("/store", (_req, res) => res.json(getStore()))
app.post("/store", (req, res) => {
  setStore(req.body)
  res.json(getStore())
})

app.get("/reset", (req, res) => {
  initializeStore()
  res.json(getStore())
})

app.listen(STORE_SERVER_PORT, () => {
  console.log(`Store server is running on port ${STORE_SERVER_PORT}.`)
  initializeStore()
})

export { }

function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}
