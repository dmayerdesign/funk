import { Configuration } from "../../../configuration/domain/configuration"

type ContentSecurityPolicy = string

function getCsp(projectId: string): ContentSecurityPolicy {
  const csp: Record<string, string[]> = {
    "default-src": [
      "'self'",
      `https://${projectId}.firebaseapp.com`,
      "https://*.googleapis.com",
      "https://*.cloudfunctions.net",
      "https://*.google.com",
      "https://*.gstatic.com",
      "https://recaptcha.net",
      "https://player.vimeo.com",
      "https://vod-progressive.akamaized.net",
    ],
    "img-src": [
      "'self'",
      "https://*.googleapis.com",
      "https://*.cloudfunctions.net",
      "https://*.google.com",
      "https://*.gstatic.com",
      "https://images.pexels.com",
      "data:",
    ],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  }

  return Object.keys(csp)
    .map((key) => `${key} ${csp[key].join(" ")}`)
    .join("; ")
}

export function construct(_configuration: Configuration) {
  return function (projectId: string): string {
    return `{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": ".funk/build-pipeline-output/external-build/client-app-browser",
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
            "value": "${getCsp(projectId) ?? ""}"
          }
        ]
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "source": ".funk/build-pipeline-output/internal-build"
  }
}
`
  }
}
