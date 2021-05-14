#!/usr/bin/env node
import { exec } from "shelljs"
import { fileURLToPath } from "url"
import packageJson from "../../package.json"
const { dependencies, devDependencies } = packageJson

export default function main() {
  exec(
    `npm up ${[
      ...Object.keys(dependencies),
      ...Object.keys(devDependencies),
    ].join(" ")}`,
  )
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
