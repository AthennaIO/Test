/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { Test, BeforeAll, ExitFaker, TestContext, AfterAll } from '#src'

export default class BeforeAllExceptionTest {
  @BeforeAll()
  public async beforeAll() {
    ExitFaker.fake()
  }

  @BeforeAll()
  public async beforeAllError() {
    throw new Error('this error will throw')
  }

  @BeforeAll()
  public async beforeAllException() {
    throw new Exception({ message: 'this error will throw', help: 'Try doing, x, y, z to fix your problem' })
  }

  @AfterAll()
  public async afterAll() {
    ExitFaker.release()
  }

  @Test()
  public async shouldLogAnExceptionWhenBeforeAllHookFails({ assert }: TestContext) {
    assert.isTrue(ExitFaker.faker.calledTwice)
    assert.isTrue(ExitFaker.faker.calledWith(1))
  }
}
