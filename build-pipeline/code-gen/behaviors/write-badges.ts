#!/usr/bin/env node
/* eslint-disable */
import { existsSync, readFileSync, writeFileSync } from "fs-extra"
import { JSDOM } from "jsdom"
import { escapeRegExp } from "lodash"
import { resolve } from "path"

const readmeBadgeStartComment = "<!-- start badges -->"
const readmeBadgeEndComment = "<!-- end badges -->"
const pathToReadme = resolve(__dirname, "../../../", "README.md")
const readmeAsString = readFileSync(pathToReadme).toString("utf-8")
const readmeIsWritableForBadges =
  readmeAsString.indexOf(readmeBadgeStartComment) > -1 &&
  readmeAsString.indexOf(readmeBadgeEndComment) > -1

const pathToUiCoverageReport = resolve(
  __dirname,
  "../../../",
  "coverage/ui/lcov-report/index.html",
)
const pathToApiCoverageReport = resolve(
  __dirname,
  "../../../",
  "coverage/api/lcov-report/index.html",
)

if (existsSync(pathToUiCoverageReport) && existsSync(pathToApiCoverageReport)) {
  const uiCoverageReportHtml = readFileSync(pathToUiCoverageReport)
  const apiCoverageReportHtml = readFileSync(pathToApiCoverageReport)

  const { window: uiWindow } = new JSDOM(uiCoverageReportHtml)
  const { window: apiWindow } = new JSDOM(apiCoverageReportHtml)

  const { linesCovered: uiLinesCovered, linesTotal: uiLinesTotal } = Array.from(
    uiWindow.document.querySelectorAll<HTMLTableCellElement>(
      ".coverage-summary tbody td:last-child",
    ),
  )
    .map((node) => node.innerHTML?.trim())
    .filter((x) => !!x)
    .map((fractionString) =>
      fractionString.split("/").map((lineCount) => parseInt(lineCount, 10)),
    )
    .reduce(
      (report, [dividend, divisor]) => ({
        linesCovered: report.linesCovered + dividend,
        linesTotal: report.linesTotal + divisor,
      }),
      { linesCovered: 0, linesTotal: 0 },
    )
  const {
    linesCovered: apiLinesCovered,
    linesTotal: apiLinesTotal,
  } = Array.from(
    apiWindow.document.querySelectorAll<HTMLTableCellElement>(
      ".coverage-summary tbody td:last-child",
    ),
  )
    .map((node) => node.innerHTML?.trim())
    .filter((x) => !!x)
    .map((fractionString) =>
      fractionString.split("/").map((lineCount) => parseInt(lineCount, 10)),
    )
    .reduce(
      (report, [dividend, divisor]) => ({
        linesCovered: report.linesCovered + dividend,
        linesTotal: report.linesTotal + divisor,
      }),
      { linesCovered: 0, linesTotal: 0 },
    )

  const readmeSplit = readmeAsString.split(
    new RegExp(
      `${escapeRegExp(readmeBadgeStartComment)}|${escapeRegExp(
        readmeBadgeEndComment,
      )}`,
    ),
  )

  if (readmeIsWritableForBadges) {
    const uiCoveragePercent = Math.floor((uiLinesCovered / uiLinesTotal) * 100)
    const apiCoveragePercent = Math.floor(
      (apiLinesCovered / apiLinesTotal) * 100,
    )
    const uiCoverageColor =
      uiCoveragePercent >= 90
        ? "brightgreen"
        : uiCoveragePercent >= 80
        ? "green"
        : uiCoveragePercent >= 70
        ? "yellowgreen"
        : uiCoveragePercent >= 60
        ? "yellow"
        : uiCoveragePercent >= 50
        ? "orange"
        : "red"
    const apiCoverageColor =
      apiCoveragePercent >= 90
        ? "brightgreen"
        : apiCoveragePercent >= 80
        ? "green"
        : apiCoveragePercent >= 70
        ? "yellowgreen"
        : apiCoveragePercent >= 60
        ? "yellow"
        : apiCoveragePercent >= 50
        ? "orange"
        : "red"

    const newReadme = [
      readmeSplit[0].trim() + "\n",
      readmeBadgeStartComment + "\n",
      "[![build](https://github.com/dmayerdesign/funk/workflows/build/badge.svg)](https://github.com/dmayerdesign/funk/actions?query=workflow%3A%22build%22)\n",
      `![UI coverage](https://img.shields.io/badge/UI%20coverage-${uiCoveragePercent}%25-${uiCoverageColor})\n`,
      `![API coverage](https://img.shields.io/badge/API%20coverage-${apiCoveragePercent}%25-${apiCoverageColor})\n`,
      readmeBadgeEndComment + "\n\n",
      readmeSplit[2].trimLeft(),
    ].join("")

    writeFileSync(pathToReadme, newReadme)
  } else {
    console.warn(
      "Could not write README badges. Make sure README.md has the following comments:" +
        readmeBadgeStartComment +
        " and " +
        readmeBadgeEndComment,
    )
  }
}
