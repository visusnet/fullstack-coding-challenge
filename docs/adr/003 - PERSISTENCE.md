## ADR-003: Persistence

### Context

There is no explicit requirement to permanently persist bookmarked repositories. An in-memory persistence is sufficient for this use case.

### Decision

In-memory persistence will be used for bookmarked repositories, as there is no explicit requirement for permanent persistence.

### Consequences

This decision will simplify the implementation by avoiding the need for a persistent storage solution. It will also reduce the complexity and maintenance overhead of the system.
