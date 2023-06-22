/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Context } from '#src/types'
import { Exception } from '@athenna/common'
import { Test, BeforeAll, ExitFaker, AfterEach, AfterAll } from '#src'

export default class AfterEachExceptionTest {
  @BeforeAll()
  public async beforeAll() {
    ExitFaker.fake()
  }

  @AfterEach()
  public async afterEachError() {
    throw new Error('this error will throw')
  }

  @AfterEach()
  public async afterEachException() {
    throw new Exception({ message: 'this error will throw', help: 'Try doing, x, y, z to fix your problem' })
  }

  @AfterAll()
  public async releaseExitFaker() {
    ExitFaker.release()
  }

  @Test()
  public async shouldBeEqual({ assert }: Context) {
    assert.equal(1, 1)
  }
}
