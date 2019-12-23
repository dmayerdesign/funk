import { readFileSync } from 'fs-extra'
import { compile } from 'handlebars'
import { CreateEmailOptions } from '../email-options'

export default function(
  options: CreateEmailOptions & { [key: string]: any },
  runtimePathToTemplate: string,
): string
{
  const template = compile(readFileSync(runtimePathToTemplate).toString('utf8'))
  return template(options)
}
