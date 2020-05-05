# Ideas that I think are good

## Framework independence

We need to treat frameworks as tools, not architectures. I want my business logic to be
written in a language I know well—in this case TypeScript—and not in the language of this
year's hottest tooling.

## Writing super-clean, test-driven code

- Take the SOLID principles (aka object-oriented design) seriously.
- Take testing seriously.
- Take type safety and code correctness seriously.

## Performance pitfalls should be avoided, but so should micro-optimization.

- **Example of avoiding pitfalls:** Anything that runs in resource-constrained
  environments should be easily tree-shakeable and only as big as it needs to be.
- **Example of avoiding micro-optimization:** Writing code that does things like direct DOM
  manipulation should be avoided if possible, even if it provides a small performance
  boost, since platform-specific concerns should be delegated to the framework.

## The file system is part of the code

I already named the file; if a file exports only one thing, why repeat myself? Using
default exports makes refactoring easier, so I use them whenever it makes sense. Sure,
IDEs are great at that kind of stuff, but I like to help them (and my source control) out
by minimizing how many things need to change in any given commit.

## [Trying it out] Source-control the development database

Source-controlling a JSON copy of the development database reduces the need for database
surgery and surfaces dependencies on database state.
