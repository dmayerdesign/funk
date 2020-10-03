# How To Contribute

Contributing is simple, because Funk is simple.

(Note that Funk is a work in progress. It is not yet fully functional. There are lots of big holes
that need to be filled! — Danny)

**1. Grab an issue or create your own.**

**2. Change a file inside `/features` or create your own.**

Feature files are written in [Gherkin](https://cucumber.io/docs/gherkin/reference).

**3. Write an integration test that implements the new feature.**

Integration tests live in `api/*/spec` and `ui/spec`.

**4. Write a unit test if necessary.**

**5. Make sure the tests pass.**

**6. Submit a pull request.**

__________________________________________________

## Testing Philosophy

A test is 2 things: a design tool and a form of documentation.

All production code should be covered by tests, because we need both of those things in order to
write code at scale.

All commits should aim to have one test per component changed.

## Rules For Testing

1. Write or alter an integration test for any change to production code.
2. Cover all changed or added production code with a test.

## Testing manually

See <a href="./IMPLEMENTATION.md">IMPLEMENTATION</a>.
