export function construct() {
  return function (projectName: string): string {
    return `{
  "projects": {
    "default": "${projectName}-development",
    "development": "${projectName}-development",
    "production": "${projectName}-production"
  }
}
`
  }
}

export default construct()
