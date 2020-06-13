It all boils down to simplicity.
A simple thing is easier to understand and easier to change.
How do you simplify something inherently complex like an app?
You design it to follow a set of **simple rules**.

1. Everything is a factory function.
2. 



# Other ideas that I think are good

## Single-responsibility principle

### One file, one function

- Keeps tests simple and small.
- Surfaces architectural boundaries.

## Framework independence

- That includes DI frameworks!

## Last responsible moment

- Any architectural decision should, if possible, be delayed until you have more information.

## Avoiding performance pitfalls as well as micro-optimizations

- **Example of avoiding pitfalls:** Anything that runs in resource-constrained
  environments should be easily tree-shakeable and only as big as it needs to be.
- **Example of avoiding micro-optimization:** Writing code that does things like direct DOM
  manipulation should be avoided if possible, even if it provides a small performance
  boost, since platform-specific concerns should be delegated to the framework.
