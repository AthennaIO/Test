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
  }

  @Test()
  public async shouldBeAbleToSpyObjectMethodsToMakeAssertionsOnIt({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWith(spy, 1)
  }

  @Test()
  public async shouldBeAbleToMockObjectPropertyWithDifferentValues({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').value(() => ({ id: 2 }))

    const value = userService.findById(1)

    assert.deepEqual(value, { id: 2 })
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToReturnValue({ assert }: Context) {
    const userService = new UserService()

    const mock = Mock.when(userService, 'findById').return({ id: 2 })

    userService.findById(1)

    assert.calledWith(mock, 1)
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToResolveAReturnValue({ assert }: Context) {
    const userService = new UserService()

    const mock = Mock.when(userService, 'findById').resolve({ id: 2 })

    await userService.findById(1)

    assert.calledWith(mock, 1)
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToThrowValue({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').throw(new Error('ERROR_MOCK'))

    assert.throws(() => userService.findById(1), Error)
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToRejectAValue({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').reject(new Error('ERROR_MOCK'))

    await assert.rejects(() => userService.findById(1), Error)
  }

  @Test()
  public async shouldBeAbleToCreateFakeFunctionsToBeUsedAsSpies({ assert }: Context) {
    const userService = new UserService()

    const fake = Mock.fake()
    Mock.when(userService, 'findSync').return([{ id: fake }])

    const idFakeFn = userService.findSync()[0].id as any

    idFakeFn()

    assert.called(fake)
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

  @Test()
  public async shouldBeAbleToRestoreASingleMockedMethod({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'find').reject(new Error('ERROR_MOCK'))
    Mock.when(userService, 'findById').reject(new Error('ERROR_MOCK'))

    await assert.rejects(() => userService.find(), Error)
    await assert.rejects(() => userService.findById(1), Error)

    Mock.restore(userService.find)
    Mock.restore(userService.findById)

    await assert.doesNotRejects(() => userService.find())
    await assert.doesNotRejects(() => userService.findById(1))
  }

  @Test()
  public async shouldBeAbleToRestoreASingleMockedProperty({ assert }: Context) {
    const userService = new UserService()

    const mockFind = Mock.when(userService, 'find').value(() => {
      throw new Error('ERROR_MOCK')
    })
    const mockFindById = Mock.when(userService, 'findById').value(() => {
      throw new Error('ERROR_MOCK')
    })

    await assert.rejects(() => userService.find(), Error)
    await assert.rejects(() => userService.findById(1), Error)

    Mock.restore(mockFind)
    Mock.restore(mockFindById)

    await assert.doesNotRejects(() => userService.find())
    await assert.doesNotRejects(() => userService.findById(1))
  }
}
