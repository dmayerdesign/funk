import { Configuration } from "../../../model/configuration"

type ContentSecurityPolicy = string

function getCsp(
  configuration: Configuration,
  projectName: string
): ContentSecurityPolicy {
  const csp: Record<string, string[]> = {
    "default-src": [
      "'self'",
      `https://${projectName}-${configuration}.firebaseapp.com`,
      "https://*.googleapis.com",
      "https://*.cloudfunctions.net",
      "https://*.google.com",
      "https://*.gstatic.com",
      "https://recaptcha.net",
    ],
    "img-src": [
      "'self'",
      "https://*.googleapis.com",
      "https://*.cloudfunctions.net",
      "https://*.google.com",
      "https://*.gstatic.com",
      "https://images.pexels.com",
      "https://player.vimeo.com/external",
      "data:",
    ],
    "media-src": ["'self'", "https://player.vimeo.com/external"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  }

  return Object.keys(csp)
    .map((key) => `${key} ${csp[key].join(" ")}`)
    .join("; ")
}

export function construct(configuration: Configuration) {
  return function (projectName: string): string {
    return `{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": ".funk/build-pipeline-output/ui-build/client-app-browser",
    "ignore": ["**/*firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "index.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "${getCsp(configuration, projectName) ?? ""}"
          }
        ]
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "source": ".funk/build-pipeline-output/api-build"
  }
}
`
  }
}
