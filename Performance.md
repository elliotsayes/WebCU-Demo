## Experiment

- Command: `X = (X or 0) + 1`
- 1000 Messages

### Scenario 1

- New handle each iteration
  - Initial memory
  - ~14.5s
  - ~14.5ms per message

### Scenario 2

- Reuse handle between iterations
  - ~1.6s
  - ~1.6ms per message
    - ~9x faster


### Scenario 3

- Reuse handle between iterations
- Use AOP module
  - ~20s
  - ~20ms per message
    - ~13x slower

## Conclusion

- Reusing the handle is much faster than creating a new one each time.
- AOP module is significantly slower...

Calculations:
WASM execution time = ~2ms
Handle creation time = ~13ms
