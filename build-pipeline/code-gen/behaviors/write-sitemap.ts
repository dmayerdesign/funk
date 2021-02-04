#!/usr/bin/env node
import { format } from "date-fns"
import { mkdirpSync, writeFileSync } from "fs-extra"
import { resolve } from "path"
import atlasConfiguration from "../../../ui/atlas/configuration"
import { Atlas } from "../../../ui/atlas/model/atlas"

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
}

export default function (baseUrl: string): void {
  const rootAtlas = atlasConfiguration
  const DEFAULT_LASTMOD = format(new Date(), "yyyy-MM-dd")
  const DEFAULT_CHANGEFREQ = "weekly"

  const sitemapUrls = buildSitemapUrls(rootAtlas)
  const sitemapXml = createSitemapXml(sitemapUrls)
  const outputDir = resolve(
    __dirname,
    "../../../",
    ".funk/build-pipeline-output/external-prebuild",
  )
  const outputPath = resolve(outputDir, "sitemap.xml")
  mkdirpSync(outputDir)
  writeFileSync(outputPath, sitemapXml)

  function buildSitemapUrls(
    atlas: Atlas,
    _baseUrl = baseUrl,
    isRoot = true,
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
          protocol + domain,
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
  </url>`,
    )
    .join("\n")}
</urlset>
`
}
