export const PRESENTABLE_ERROR_MARKER = "[funk][ui-copy] "

export default function(error: Error): Error
{
  if (error.message)
  {
    error.message = PRESENTABLE_ERROR_MARKER + error.message
  }
  throw error
}
