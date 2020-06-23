**It all boils down to simplicity.**

A simple thing is easier to understand and easier to change. We want things to be simple.

But how do you simplify something inherently complex like an e-commerce app?

You might say "just follow the SOLID principles." And you'd be mostly right.

But a project can follow the SOLID principles and still feel much more complex than it
should. For example, members of a team will usually have slightly different ways of
applying the SOLID principles.

The obvious answer is for everyone working on a project to
**follow a set of simple rules** that specify how to apply the SOLID principles at the code level.
What exactly those rules are is much less important than
**making sure that they're followed consistently.** What _is_ important about the rules themselves is that they be
**simple enough** to be easily and consistently followed by anyone touching the code.

Here's the small set of rules I follow in this project:

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
* **Behavior-driven development should be practiced.**
  * Benefits I've observed:
    * Centers testing and results in high test coverage.
    * Promotes a full top-down understanding of the software.
