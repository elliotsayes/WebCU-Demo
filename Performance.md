## Scenario 1

- Command: `X = X + 1`
- 1000 Messages
- New handle each iteration
- 14000~15000ms
- 14~15ms per message

## Scenario 2

- Command: `X = X + 1`
- 1000 Messages
- Reuse handle between iterations
- 1600~1700ms
- 1.6~1.7ms per message
