/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, Mock, type Context } from '#src'
import { UserService } from '#tests/fixtures/UserService'

export default class MockTest {
  @Test()
  public async shouldBeAbleToSpyObjectToMakeAssertionsOnIt({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService)

    await userService.findById(1)

    assert.calledWith(spy.findById, 1)
    await assert.resolved(spy.findById, {
      id: 1,
      name: 'João Lenon',
      email: 'lenon@athenna.io'
    })
  }

  @Test()
  public async shouldBeAbleToCreateAStubInstanceThatCouldReplaceTheOriginalObjectToMakeAssertionsOnIt({
    assert
  }: Context) {
    const userService = new UserService()

    const stub = Mock.stub(userService)

    stub.findById.resolves({
      id: 1,
      name: 'Victor Tesoura',
      email: 'txsoura@athenna.io'
    })

    await userService.findById(1)

    assert.calledWith(stub.findById, 1)
    await assert.resolved(stub.findById, {
      id: 1,
      name: 'Victor Tesoura',
      email: 'txsoura@athenna.io'
    })
  }

  @Test()
  public async shouldBeAbleToSpyObjectMethodsToMakeAssertionsOnIt({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWith(spy, 1)
    await assert.resolved(spy, {
      id: 1,
      name: 'João Lenon',
      email: 'lenon@athenna.io'
    })
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToReturnValue({ assert }: Context) {
    const userService = new UserService()

    const mock = Mock.when(userService, 'findById').return({ id: 2 })

    userService.findById(1)

    assert.calledWith(mock, 1)
    assert.returned(mock, { id: 2 })
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToResolveAReturnValue({ assert }: Context) {
    const userService = new UserService()

    const mock = Mock.when(userService, 'findById').resolve({ id: 2 })

    await userService.findById(1)

    assert.calledWith(mock, 1)
    await assert.resolved(mock, { id: 2 })
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToThrowValue({ assert }: Context) {
    const userService = new UserService()

    const mock = Mock.when(userService, 'findById').throw(new Error('ERROR_MOCK'))

    assert.throws(() => userService.findById(1), Error)

    assert.threw(mock)
    assert.threw(mock, 'Error')
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToRejectAValue({ assert }: Context) {
    const userService = new UserService()

    const mock = Mock.when(userService, 'findById').reject(new Error('ERROR_MOCK'))

    await assert.rejects(() => userService.findById(1), Error)
    await assert.rejected(mock, Error)
  }

  @Test()
  public async shouldBeAbleToRestoreAllMocks({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'find').reject(new Error('ERROR_MOCK'))
    Mock.when(userService, 'findById').reject(new Error('ERROR_MOCK'))

    await assert.rejects(() => userService.find(), Error)
    await assert.rejects(() => userService.findById(1), Error)

    Mock.restoreAll()

    await assert.doesNotRejects(() => userService.find())
    await assert.doesNotRejects(() => userService.findById(1))
  }
}
