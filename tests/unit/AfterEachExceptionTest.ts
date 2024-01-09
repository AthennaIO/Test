/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { Test, Mock, BeforeAll, AfterEach, AfterAll, type Stub, type Context } from '#src'

export default class AfterEachExceptionTest {
  public processExit: Stub

  @BeforeAll()
  public async beforeAll() {
    this.processExit = Mock.when(process, 'exit').return(undefined).get()
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
  public async restoreMock() {
    this.processExit.restore()
  }

  @Test()
  public async shouldBeEqual({ assert }: Context) {
    assert.equal(1, 1)
  }
}
