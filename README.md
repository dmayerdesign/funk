<!--
These badges are written as part of the `test` scripts.
DO NOT EDIT lines 5-11 of this file.
-->
<!-- start badges -->

[![build](https://github.com/dmayerdesign/funk/workflows/build/badge.svg)](https://github.com/dmayerdesign/funk/actions?query=workflow%3A%22build%22)
![UI coverage](https://img.shields.io/badge/UI%20coverage-92%25-brightgreen)
![API coverage](https://img.shields.io/badge/API%20coverage-78%25-yellowgreen)

<!-- end badges -->

# Funk

🎸 Funk provides clean abstractions and simple build tools designed to keep messy details
away from your groove. It sits on top of [Ionic](https://ionicframework.com/),
[Angular](https://angular.io), and [Firebase](https://firebase.google.com) so it can
easily be deployed as a cross-platform (browser, mobile, and desktop) application.

🚧 **Funk is in initial development,** and looking for contributors! If you're interested, shoot me
a message on [Gitter](https://gitter.im/funk-development/community). If you're ready to contribute,
head to [Contributing](./CONTRIBUTING.md) to get started!

## Using Funk

To use Funk, [fork this repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) and follow the instructions in [CONFIGURING](./CONFIGURING.md).

To update your fork with the latest changes from this repo,
[follow the directions here](http://docs.github.com/en/github/getting-started-with-github/fork-a-repo#keep-your-fork-synced).

## Design Goals

- **Zero to app in 30 minutes:** Funk aims to lower the barrier of entry for full-stack
  development, allowing a single developer to deploy a production-ready app in almost no time.
- **Developer experience above all:** Developing with Funk should be dead simple. To help
  achieve this, Funk strives for convention over configuration, which keeps us from wasting time
  deciding between different ways of doing the same things, and helps the project to remain as
  [clean](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) as possible.
- **Cost-effectiveness and performance:** Costly behaviors like reads and writes from Firestore
  should behave as cost-effectively as possible out of the box. Meanwhile, offline support and
  pre-rendering make sure users get a fast, modern experience.
- **Framework independence:** Funk will always rely heavily on frameworks like Ionic and
  technologies like Firebase to do the heavy lifting, but Funk will always treat these
  libraries as plugins. That means that in the future it will be easy to integrate with,
  for example, an API platform other than Firebase Functions, or a UI platform other than Ionic.

## Table Of Contents

- [Contributing](./CONTRIBUTING.md)
- [Implementing](./CONFIGURING.md)
- [Development notes](./DEVELOPMENT_NOTES.md)
- [License](./LICENSE.md)
- [Third-party licenses](./THIRD_PARTY_LICENSES.md)

## What's ["Serverless"](https://en.wikipedia.org/wiki/Serverless_computing)?

Managing a server and database — even if that means combining managed solutions for
each — usually gives me far more control (and opportunity to mess up) than I want.
A fully-managed back end, like Firebase, takes care of all my web server infrastructure,
so I can focus on writing code.

## What's "Cross-Platform"?

Funk uses the amazing cross-platform framework [Ionic](https://ionicframework.com/), which
allows it to be deployed as a website, an iOS app, and an Android app, all from the same
codebase. Funk uses [Angular](https://angular.io) as a sort of convenience layer on top of
Ionic's amazing component library, giving the developer an excellent suite of build tools
and a framework for writing user interface logic.

## License

Copyright (C) 2020 Daniel Mayer (https://github.com/dmayerdesign)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
