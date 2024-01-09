/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { Test, Mock, BeforeEach, AfterAll, BeforeAll, type Stub, type Context } from '#src'

export default class BeforeEachExceptionTest {
  public processExit: Stub

  @BeforeAll()
  public async beforeAll() {
    this.processExit = Mock.when(process, 'exit').return(undefined).get()
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
  public async restoreMock() {
    this.processExit.restore()
  }

  @Test()
  public async shouldLogAnExceptionWhenBeforeEachHookFails({ assert }: Context) {
    console.log(this.processExit)
    assert.isTrue(this.processExit.calledTwice)
    assert.isTrue(this.processExit.calledWith(1))
  }
}
