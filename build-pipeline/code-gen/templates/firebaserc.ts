export function construct() {
  return function (projectId: string): string {
    return `{
  "projects": {
    "default": "${projectId}-development",
    "development": "${projectId}-development",
    "production": "${projectId}-production"
  }
}
`
  }
}

export default construct()
