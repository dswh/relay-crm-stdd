# Triage labels

The five canonical triage **state** roles, and the two **category** roles, used by
`/triage` and `/slice`. In this repo the label string equals the role name (record
them in an issue's `Status:` / `Type:` line).

## State roles

| Role | Meaning |
|---|---|
| `needs-triage` | maintainer needs to evaluate it |
| `needs-info` | waiting on the reporter |
| `ready-for-agent` | fully specified, AFK-ready (an agent can build it) |
| `ready-for-human` | needs human implementation (judgment / access / design) |
| `wontfix` | will not be actioned |

## Category roles

| Role | Meaning |
|---|---|
| `bug` | something is broken |
| `enhancement` | a new feature or improvement |

Every triaged issue carries exactly one category and one state. Issues produced by
`/slice` are already agent-ready (`ready-for-agent`) — don't re-triage them.
