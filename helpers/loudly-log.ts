export default function (message: string, ...data: any[]): void {
  console.log(`
==============================
${message}
==============================`)
  if (data.length) {
    data.forEach((toLog) => {
      try {
        console.log(
          `
${JSON.stringify(toLog)}
`,
        )
      } catch {
        console.log(
          `
${toLog}
`,
        )
      }
    })
  }
}
