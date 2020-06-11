# Ideas that I think are good

## Single-responsibility principle

### One file, one function

- Keeps tests simple and small.
- Surfaces architectural boundaries.

## Plugin architecture

- A "plugin" is anything that imports "third-party" code. "Third-party" is anything that ISN'T
  - Part of the domain model
  - Responsible for gluing the domain model to a platform

## Framework independence

- That includes DI frameworks!

## Last responsible moment

## Avoiding performance pitfalls as well as micro-optimizations

- **Example of avoiding pitfalls:** Anything that runs in resource-constrained
  environments should be easily tree-shakeable and only as big as it needs to be.
- **Example of avoiding micro-optimization:** Writing code that does things like direct DOM
  manipulation should be avoided if possible, even if it provides a small performance
  boost, since platform-specific concerns should be delegated to the framework.

## [Trying it out] Source-control initial states of the development database

Source-controlling a JSON copy of the development database reduces the need for database
surgery and surfaces dependencies on database state.
