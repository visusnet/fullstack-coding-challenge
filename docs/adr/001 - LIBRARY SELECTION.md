## ADR-001: Selection of Express.js

### Context

There was a choice between Express.js and Nest.js for implementing the RESTful API as part of the coding challenge. The challenge is to create a simple RESTful API to explore GitHub repositories, with no user interface and local storage for bookmarks. The API should allow users to view the most popular repositories created in the last 2 weeks and filter by programming language.

### Decision

Express.js was selected over Nest.js for implementing the RESTful API. This decision was made not because of a lack of experience in Nest.js, but because the selected library's complexity should correspond to the task at hand. The challenge, as outlined in the README.md, is relatively simple, and a lightweight library like Express.js is perfectly suited for the requirements without adding additional costs such as maintenance, complexity, or a steep learning curve for other developers.

### Consequences

By selecting Express.js, the implementation of the RESTful API will be straightforward and aligned with the simplicity of the coding challenge. This choice will help in keeping the solution lightweight, easy to maintain, and accessible to other developers without the need for extensive learning. Additionally, it will minimize the overhead of managing a more complex framework, allowing the focus to remain on the core functionality of the API.
