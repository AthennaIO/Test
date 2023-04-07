/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { Test, BeforeEach, ExitFaker, TestContext, AfterAll, BeforeAll } from '#src'

export default class BeforeEachExceptionTest {
  @BeforeAll()
  public async beforeAll() {
    ExitFaker.fake()
  }

  @BeforeEach()
  public async beforeEachError() {
    throw new Error('this error will throw')
  }

  @BeforeEach()
  public async beforeEachException() {
    throw new Exception({ message: 'this error will throw', help: 'Try doing, x, y, z to fix your problem' })
  }

  @AfterAll()
  public async afterAll() {
    ExitFaker.release()
  }

  @Test()
  public async shouldLogAnExceptionWhenBeforeEachHookFails({ assert }: TestContext) {
    assert.isTrue(ExitFaker.faker.calledTwice)
    assert.isTrue(ExitFaker.faker.calledWith(1))
  }
}