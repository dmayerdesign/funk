import { Configuration } from "@funk/model/configuration"

type ContentSecurityPolicy = string
const cspByConfiguration = new Map<Configuration, ContentSecurityPolicy>([
  [
    Configuration.LOCAL,
    "default-src 'self' https://funk-development-0907.firebaseapp.com https://*.googleapis.com https://*.cloudfunctions.net https://*.google.com https://*.gstatic.com https://recaptcha.net; img-src 'self' https://*.googleapis.com https://*.cloudfunctions.net https://*.google.com https://*.gstatic.com https://images.pexels.com/* https://player.vimeo.com/external/* data:; style-src 'unsafe-inline' 'self' https://fonts.googleapis.com",
  ],
  [
    Configuration.DEVELOPMENT,
    "default-src 'self' https://funk-development-0907.firebaseapp.com https://*.googleapis.com https://*.cloudfunctions.net https://*.google.com https://*.gstatic.com https://recaptcha.net; img-src 'self' https://*.googleapis.com https://*.cloudfunctions.net https://*.google.com https://*.gstatic.com https://images.pexels.com/* https://player.vimeo.com/external/* data:; style-src 'unsafe-inline' 'self' https://fonts.googleapis.com",
  ],
  [
    Configuration.PRODUCTION,
    "default-src 'self' https://funk-production-0907.firebaseapp.com https://*.googleapis.com https://*.cloudfunctions.net https://*.google.com https://*.gstatic.com https://recaptcha.net; img-src 'self' https://*.googleapis.com https://*.cloudfunctions.net https://*.google.com https://*.gstatic.com https://images.pexels.com/* https://player.vimeo.com/external/* data:; style-src 'unsafe-inline' 'self' https://fonts.googleapis.com",
  ],
])

export function construct(configuration: Configuration) {
  return function () {
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
                "value": "${cspByConfiguration.get(configuration) ?? ""}"
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
    }`
  }
}
