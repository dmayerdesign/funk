# Ideas that I think are good

## Framework independence

We need to treat frameworks as tools, not architectures. I want my business logic to be
written in a language I know well—TypeScript—and not in the language of this year's
hottest tooling.

## Writing super-clean, test-driven code

- Take the SOLID principles (aka object-oriented design) seriously.
- Take testing seriously.
- Take type safety and code correctness seriously.

## Avoiding performance pitfalls as well as micro-optimizations

- **Example of avoiding pitfalls:** Anything that runs in resource-constrained
  environments should be easily tree-shakeable and only as big as it needs to be.
- **Example of avoiding micro-optimization:** Writing code that does things like direct DOM
  manipulation should be avoided if possible, even if it provides a small performance
  boost, since platform-specific concerns should be delegated to the framework.

# Less-important ideas that are also good

## The file system is part of the code

Default exports offer several advantages:

- Instead of the function/class name occurring twice in my code (in the filename and in
  the function/class definition), it only occurs once.
- They encourage writing single-responsibility files.

## [Trying it out] Source-control the development database

Source-controlling a JSON copy of the development database reduces the need for database
surgery and surfaces dependencies on database state.
