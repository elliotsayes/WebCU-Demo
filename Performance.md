## Experiment

- Command: `X = (X or 0) + 1`
- 1000 Messages

### Scenario 1

- Old 32-bit module
- New handle each iteration
  - Initial memory
  - ~14.5s
  - ~14.5ms per message

### Scenario 2

- Old 32-bit module
- Reuse handle between iterations
  - ~1.6s
  - ~1.6ms per message
    - ~9x faster

### Scenario 3

- AOP 32-bit module
- Reuse handle between iterations
- Running Physics simulation
  - ~20s
  - ~20ms per message
    - ~13x slower than #2
  - Memory is around 60MB
    - ~10x more than #2

### Scenario 4

- AOP 32-bit module
- Reuse handle between iterations
- Not inputting/outputting memory to the instance
  - ~1.6s
  - ~1.6ms per message
    - ~Same as #2
    - ~13x faster than #3
  - Memory is around 60MB
    - 10x more than #2, ~same as #3
    - Same as #3, #4

### Scenario 5

- AOP 32-bit module
- Reuse handle between iterations
- Not inputting/outputting memory to the instance
- Running physics simulation
  - ~2s
  - ~2ms per message
    - ~1.3x slower than #2, #4
    - ~10x faster than #3
  - Memory is around 60MB
    - 10x more than #2
    - Same as #3, #4

## Conclusion

- Reusing the handle is much faster than creating a new one each time.
- AOP module is significantly slower, when outputting memory, otherwise around the same
- Running the a basic physics simulation takes and addition 30% time

Calculations:
WASM execution time = ~2ms
Handle creation time = ~13ms
