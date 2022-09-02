import { test } from '#src/index'

test.group('TestTestFn', () => {
  test('should be able to run tests', ({ assert }) => {
    assert.equal(2 + 2, 4)
  })
})
