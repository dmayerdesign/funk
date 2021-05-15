#!/usr/bin/env node
import { exec } from "shelljs"
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

if (require.main === module) {
  main()
}
