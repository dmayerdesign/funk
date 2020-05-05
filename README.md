# Funk

Funk aims to be a
[clean](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html),
well-optimized starting point for writing web-based software. With just a bit of
configuration, you get a [serverless](https://en.wikipedia.org/wiki/Serverless_computing)
[progressive web app](https://en.wikipedia.org/wiki/Progressive_web_applications)
written with [Angular](https://angular.io) to run on
[Firebase](https://firebase.google.com).

## What's "serverless"?

Managing a server and database—even if that means combining managed solutions for
each—gives me, a front end developer, far more control (and opportunity to mess up) than
I want. A fully-managed back end, like Firebase, takes care of all my infrastructure, so
I can focus on writing code.

## Design goals

- **Zero to app in 10 minutes:** Funk aims to lower the barrier of entry for full-stack
  development, allowing me to deploy a production-ready app in almost no time.
- **Cost-effectiveness:** Costly behaviors like reads and writes from Firestore should
  perform as efficiently as possible out of the box.
- **Performance:** Offline support and pre-rendering make sure users get a fast, modern
  experience.
- **Developer experience:** Using Funk should be dead simple and super fun. Funk strives
  for convention over configuration

## Technologies

- **TypeScript:** Native support by both Google Cloud Functions and Angular is a plus, but
  it's TypeScript's amazing feature set that makes it a winner for enterprise-level full-
  stack development.
- **Serverless:** By integrating with Google Cloud Firestore and Cloud Functions, Funk
  lets me build and deploy an app with minimal configuration and minimal cost.

## Philosophy

The philosophy underlying Funk is simple: what we're trying to do as developers is
**build [clean](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) software**.
The overarching goal of Funk is to make the pursuit of clean code **easier** and
**more fun**.

## Using Funk



Follow these steps to run a web app locally.

Note that in this configuration, you still need to be connected to the internet for the
database and authentication to work.

1. [Install Node.](https://nodejs.org/en/download/)

2. Download the code: https://github.com/dmayerdesign/funk

3. In your favorite shell (e.g. Terminal for Mac, Command Prompt for Windows), `cd` into
the repo directory. For example, if you downloaded the code to `Downloads`, you might
write this:

```sh
cd /Users/danielmayer/Downloads/funk
```

4. Install.

```sh
npm install
```

5. If you'd like to run just the Angular app locally, you can simply run the following:

```sh
npm run ui::develop::development
```

6. To run in development (hot reload) mode, you need to open 2 shell windows. You'll
probably want to do this while you're editing code.

```sh
# The first window builds the front end (an Angular app) and
# watches for file changes. It serves the web app at the URL
# http://localhost:8100.

npm run ui::develop::local

# The second window runs server-side functions locally.

npm run functions::develop::local
```
