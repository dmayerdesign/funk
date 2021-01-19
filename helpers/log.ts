export default function (message: string, ...data: any[]): void {
  console.warn(`[funk] ${message}`)
  if (data?.length) {
    data.forEach((toLog) => {
      try {
        console.warn(JSON.stringify(toLog))
      } catch {
        console.warn(`${toLog}`)
      }
    })
  }
}
