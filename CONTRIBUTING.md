# How To Contribute

Contributing is simple, because Funk is simple.

(Note that Funk is a work in progress. It is not yet fully functional. There are lots of big holes
that need to be filled! — Danny)

**1. Grab an [issue](https://github.com/dmayerdesign/funk/issues) or create your own.**

**2. [Clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this repository.**

**3. Change a file inside `/features` or create your own.**

Feature files are written in [Gherkin](https://cucumber.io/docs/gherkin/reference).

**4. Write an integration test that implements the new feature.**

Integration tests live in `api/*/spec` and `ui/spec`.

**5. Write a unit test if necessary.**

**6. Commit your changes.**

Commit messages should be written in the style of
[conventional commits](https://www.conventionalcommits.org).

**7. Submit a pull request.**

___

## Testing Philosophy

A test is 2 things: a design tool and a form of documentation.

All production code should be covered by tests, because we need both of those things in order to
write code at scale.

All commits should aim to have one test per component changed.

## Rules For Testing

1. Write or alter an integration test for any change to production code.
2. Cover all changed or added production code with a test.

## Testing Manually

See [IMPLEMENTING](./IMPLEMENTING.md).

___

## The Development Experience

**It all boils down to simplicity.**

A simple thing is easier to understand, change, extend, and debug. We want Funk to be simple.

But how do you simplify something inherently complex like an e-commerce app?

You might say "just follow the SOLID principles." You'd be mostly right.

But a project can follow the SOLID principles and still feel much more complex than it
should. Members of a team will also usually have varying ways of applying the SOLID
principles.

The obvious answer is for everyone working on a project to
**follow a set of simple rules** that specify how to apply the SOLID principles at the code level.
What exactly those rules are is much less important than
**making sure that they're followed consistently.** What _is_ important about the rules themselves
is that they be **simple enough** to be easily and consistently followed by anyone touching the
code.

Here's the small set of rules that Funk aims to follow:

* **Files containing logic should export only one function.**
  * Benefits I've observed:
    * Keeps tests small and readable.
    * Surfaces architectural boundaries.
    * Maximizes modularity.
    * Forces code to be more organized.
* **Third-party code, including frameworks, should be imported in as few files as**
  **possible.**
  * Benefits I've observed:
    * Framework independence.
    * Makes testing easier.
* **[Behavior-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development) should be practiced.**
  * Benefits I've observed:
    * Centers testing and results in high test coverage.
    * Promotes a full top-down understanding of the software.

