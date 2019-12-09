export default function(error: Error): Error
{
  if (error.message) {
    error.message = '[funk] ' + error.message
  }
  throw error
}
