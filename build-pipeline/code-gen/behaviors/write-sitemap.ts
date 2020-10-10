#!/usr/bin/env node
import { format } from "date-fns"
import { writeFileSync, mkdirpSync } from "fs-extra"
import { resolve } from "path"
import recursiveReaddir from "recursive-readdir-sync"

import { Atlas } from "../../../model/ui/atlas/atlas"

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
}

export default async function (baseUrl: string): Promise<void> {
  const rootAtlas = await getRootAtlas()
  const DEFAULT_LASTMOD = format(new Date(), "yyyy-MM-dd")
  const DEFAULT_CHANGEFREQ = "weekly"

  const sitemapUrls = buildSitemapUrls(rootAtlas)
  const sitemapXml = createSitemapXml(sitemapUrls)
  const outputDir = resolve(
    __dirname,
    "../../../",
    ".funk/build-pipeline-output/ui-assets"
  )
  const outputPath = resolve(outputDir, "sitemap.xml")
  mkdirpSync(outputDir)
  writeFileSync(outputPath, sitemapXml)

  function buildSitemapUrls(
    atlas: Atlas,
    _baseUrl = baseUrl,
    isRoot = true
  ): SitemapUrl[] {
    const initial = isRoot
      ? [
          {
            loc: _baseUrl,
            lastmod: DEFAULT_LASTMOD,
            changefreq: DEFAULT_CHANGEFREQ,
          },
        ]
      : []
    return Object.keys(atlas)
      .filter((key) => atlas[key].public)
      .reduce((acc, key) => {
        const protocol = _baseUrl.split("://")[0] + "://"
        const baseUrlSansProtocol = _baseUrl.split("://")[1]
        const domain = baseUrlSansProtocol.split("/")[0]
        const basePaths = baseUrlSansProtocol.split("/").slice(1)
        const url = new URL(
          [...(basePaths ?? []), key].join("/"),
          protocol + domain
        ).toString()

        return [
          ...acc,
          {
            loc: url,
            lastmod: DEFAULT_LASTMOD,
            changefreq: DEFAULT_CHANGEFREQ,
          },
          ...buildSitemapUrls(atlas[key]?.__atlas__ ?? {}, url, false),
        ]
      }, initial)
  }
}

async function getRootAtlas(): Promise<Atlas> {
  const uiDirname = resolve(__dirname, "../../../", "ui")
  const atlasFilenames = recursiveReaddir(uiDirname).filter((filename) =>
    filename.match(/atlas\.ts$/g)
  )
  const rootAtlasFilename = atlasFilenames[0]

  if (rootAtlasFilename) {
    const rootAtlasExports = await import(rootAtlasFilename)
    return rootAtlasExports.default
  }
  return {}
}

function createSitemapXml(sitemapUrls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls
    .map(
      (sitemapUrl) =>
        `
  <url>
    <loc>${sitemapUrl.loc}</loc>
    <lastmod>${sitemapUrl.lastmod}</lastmod>
    <changefreq>${sitemapUrl.changefreq}</changefreq>
  </url>`
    )
    .join("\n")}
</urlset>
`
}
