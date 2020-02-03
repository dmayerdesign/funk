export default function(message: string, ...data: any[]): void
{
  console.log('==============================')
  console.log(`===> ${message}`)
  if (data.length)
  {
    data.forEach((toLog) =>
    {
      console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
      try
      {
        console.log(JSON.stringify(toLog))
      }
      catch
      {
        console.log(`${toLog}`)
      }
    })
  }
  console.log('==============================')
}
