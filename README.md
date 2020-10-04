# Funk

Funk aims to be a
[good](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
starting point for writing web-based software. With just a bit of
configuration, you get a [serverless](https://en.wikipedia.org/wiki/Serverless_computing)
[cross-platform web app](https://en.wikipedia.org/wiki/Progressive_web_applications)
written with [Ionic](https://ionicframework.com/) and [Angular](https://angular.io) to
run on [Firebase](https://firebase.google.com).

## Design Goals

- **Zero to app in 30 minutes:** Funk aims to lower the barrier of entry for full-stack
  development, allowing me to deploy a production-ready app in almost no time.
- **Cost-effectiveness:** Costly behaviors like reads and writes from Firestore should
  perform as efficiently as possible out of the box.
- **Performance:** Offline support and pre-rendering make sure users get a fast, modern
  experience.
- **Developer experience:** Using Funk should be dead simple and super fun. Funk strives
  for convention over configuration
- **Framework independence:** Funk will always rely heavily on frameworks like Ionic and
  technologies like Firebase to do the heavy lifting, but Funk will always treat these
  libraries as plugins. That means that in the future, will be possible to integrate with,
  for example, a cloud platform other than Firebase.

## Table Of Contents

* [Contributing](./CONTRIBUTING.md)
* [Implementing](./IMPLEMENTING.md)
* [Development notes](./DEVELOPMENT_NOTES.md)
* [License](./LICENSE.md)
* [Third-party licenses](./THIRD_PARTY_LICENSES.md)

## What's "Serverless"?

Managing a server and database — even if that means combining managed solutions for
each — gives me, a front-end developer, far more control (and opportunity to mess up) than
I want. A fully-managed back end, like Firebase, takes care of all my web server
infrastructure, so I can focus on writing code.

## What's "Cross-Platform"?

Funk uses the amazing cross-platform framework [Ionic](https://ionicframework.com/), which
allows it to be deployed as a website, an iOS app, and an Android app, all from the same
codebase. Funk uses [Angular](https://angular.io) as a sort of convenience layer on top of
Ionic's amazing component library, giving the developer an excellent suite of build tools
and a framework for writing user interface logic.

## Philosophy

The philosophy underlying Funk is simple: what we're trying to do as developers is
**build [clean](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) software**.
The overarching goal of Funk is to make the pursuit of clean code **easier** and
**more fun**.
