/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { Test, Mock, BeforeAll, AfterAll, type Stub, type Context } from '#src'

export default class BeforeAllExceptionTest {
  public processExit: Stub

  @BeforeAll()
  public async beforeAll() {
    this.processExit = Mock.when(process, 'exit').return(undefined)
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
  public async restoreMock() {
    this.processExit.restore()
  }

  @Test()
  public async shouldLogAnExceptionWhenBeforeAllHookFails({ assert }: Context) {
    assert.isTrue(this.processExit.calledTwice)
    assert.isTrue(this.processExit.calledWith(1))
  }
}
