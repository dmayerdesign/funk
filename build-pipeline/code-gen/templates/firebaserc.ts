export function construct() {
  return function (projectName: string): string {
    return `{
  "projects": {
    "default": "${projectName}-development",
    "development": "${projectName}-development",
    "staging": "${projectName}-staging",
    "production": "${projectName}-production"
  }
}
`
  }
}

export default construct()
