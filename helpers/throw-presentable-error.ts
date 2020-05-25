export default function(error: Error): Error
{
  if (error.message)
  {
    error.message = "[funk][ui-copy] " + error.message
  }
  throw error
}
