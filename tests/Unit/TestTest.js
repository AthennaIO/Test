import { Test } from '#src/index'

export class TestTest extends Test {
  beforeAll() {}

  beforeEach() {}

  afterAll() {}

  afterEach() {}

  /**
   * Run your test.
   *
   * @param {import('#src/index.js').UnitTestContext} ctx
   */
  async shouldBeAbleToRunTests({ assert }) {
    assert.equal(2 + 2, 4)
  }
}
