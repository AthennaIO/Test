import { test } from '@japa/runner'

test.group('FeatureFnTestTest', () => {
  test('should be able to run tests', async ({ assert }) => {
    assert.equal(2 + 2, 4)
  })
})
