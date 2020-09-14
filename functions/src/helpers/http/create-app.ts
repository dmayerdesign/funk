import { TRUSTED_ORIGINS } from "@funk/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"

export interface CreateAppOptions {
  corsOptions?: cors.CorsOptions
}

export function construct(appFactory = () => express())
{
  return function({ corsOptions }: CreateAppOptions = {}): express.Application
  {
    return appFactory().use(
      cookieParser(),
      cors({
        origin: TRUSTED_ORIGINS,
        ...corsOptions,
      })
    )
  }
}

export default construct()
