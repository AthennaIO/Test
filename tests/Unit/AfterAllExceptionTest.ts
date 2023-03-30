/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { Test, BeforeAll, ExitFaker, AfterAll, TestContext } from '#src'

export default class AfterAllExceptionTest {
  @BeforeAll()
  public async beforeAll() {
    ExitFaker.fake()
  }

  @AfterAll()
  public async afterAllError() {
    throw new Error('this error will throw')
  }

  @AfterAll()
  public async afterAllException() {
    throw new Exception({ message: 'this error will throw', help: 'Try doing, x, y, z to fix your problem' })
  }

  @AfterAll()
  public async releaseExitFaker() {
    ExitFaker.release()
  }

  @Test()
  public async shouldBeEqual({ assert }: TestContext) {
    assert.equal(1, 1)
  }
}
