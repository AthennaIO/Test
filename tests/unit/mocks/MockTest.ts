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

    const mock = Mock.when(userService, 'findById').return({ id: 2 }).get()

    userService.findById(1)

    assert.calledWith(mock, 1)
  }

  @Test()
  public async shouldBeAbleToMockObjectMethodsToResolveAReturnValue({ assert }: Context) {
    const userService = new UserService()

    const mock = Mock.when(userService, 'findById').resolve({ id: 2 }).get()

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

    await assert.doesNotReject(() => userService.find())
    await assert.doesNotReject(() => userService.findById(1))
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

    await assert.doesNotReject(() => userService.find())
    await assert.doesNotReject(() => userService.findById(1))
  }

  @Test()
  public async shouldBeAbleToRestoreASingleMockedProperty({ assert }: Context) {
    const userService = new UserService()

    const mockFind = Mock.when(userService, 'find')
      .value(() => {
        throw new Error('ERROR_MOCK')
      })
      .get()
    const mockFindById = Mock.when(userService, 'findById')
      .value(() => {
        throw new Error('ERROR_MOCK')
      })
      .get()

    await assert.rejects(() => userService.find(), Error)
    await assert.rejects(() => userService.findById(1), Error)

    Mock.restore(mockFind)
    Mock.restore(mockFindById)

    await assert.doesNotReject(() => userService.find())
    await assert.doesNotReject(() => userService.findById(1))
  }

  @Test()
  public async shouldBeAbleToMockAMethodOnlyWhenCalledWithDeterminedArgs({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withArgs(2).resolve({ id: 2 }).withArgs(3).resolve({ id: 3 })

    assert.deepEqual(await userService.findById(1), { id: 1, name: 'João Lenon', email: 'lenon@athenna.io' })
    assert.deepEqual(await userService.findById(2), { id: 2 })
    assert.deepEqual(await userService.findById(3), { id: 3 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockAMethodOnlyWhenCalledWithDeterminedArgsChangingItBehavior({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withArgs(2).resolve({ id: 2 }).withArgs(3).return({ id: 3 })

    assert.deepEqual(await userService.findById(1), { id: 1, name: 'João Lenon', email: 'lenon@athenna.io' })
    assert.deepEqual(await userService.findById(2), { id: 2 })
    assert.deepEqual(userService.findById(3), { id: 3 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockAMethodOnlyOnSecondAndThirdCall({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').onSecondCall().resolve({ id: 2 }).onThirdCall().return({ id: 3 })

    assert.deepEqual(await userService.findById(1), { id: 1, name: 'João Lenon', email: 'lenon@athenna.io' })
    assert.deepEqual(await userService.findById(2), { id: 2 })
    assert.deepEqual(userService.findById(3), { id: 3 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockAMethodOnlyOnFourthCall({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').onCall(4).resolve({ id: 4 })

    assert.deepEqual(await userService.findById(1), { id: 1, name: 'João Lenon', email: 'lenon@athenna.io' })
    assert.deepEqual(await userService.findById(1), { id: 1, name: 'João Lenon', email: 'lenon@athenna.io' })
    assert.deepEqual(await userService.findById(1), { id: 1, name: 'João Lenon', email: 'lenon@athenna.io' })
    assert.deepEqual(await userService.findById(1), { id: 4 })
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsAString({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withStringArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById('1'), { id: 2 })
    assert.deepEqual(await userService.findById(1), { id: 1, name: 'João Lenon', email: 'lenon@athenna.io' })
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsANumber({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withNumberArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(1), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsAnObject({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withObjectArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById({}), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsAnArray({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withArrayArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById([]), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsADate({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withDateArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(new Date()), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsARegexp({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withRegexpArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(new RegExp()), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsABoolean({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withBooleanArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(false), { id: 2 })
    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(true), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenArgIsAFunction({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withFunctionArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(() => {}), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenExistsAnyArg({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withAnyArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(null), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenValueIsTruthy({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withTruthyArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(true), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMockOnlyWhenValueIsFalsy({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').withFalsyArg().resolve({ id: 2 })

    // eslint-disable-next-line
    // @ts-ignore
    assert.deepEqual(await userService.findById(false), { id: 2 })
    assert.deepEqual(await userService.findById(), undefined)
  }

  @Test()
  public async shouldBeAbleToMergeWithArgsAndOnCall({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById')
      .withArgs(1)
      .onFirstCall()
      .resolve({ id: 2 })
      .onSecondCall()
      .resolve({ id: 3 })
      .withArgs(3)
      .resolve({ id: 4 })

    assert.deepEqual(await userService.findById(1), { id: 2 })
    assert.deepEqual(await userService.findById(1), { id: 3 })
    assert.deepEqual(await userService.findById(1), {
      id: 1,
      name: 'João Lenon',
      email: 'lenon@athenna.io'
    })
    assert.deepEqual(await userService.findById(2), undefined)
    assert.deepEqual(await userService.findById(3), { id: 4 })
  }

  @Test()
  public async shouldBeAbleToReturnTheThisPropertyInAMock({ assert }: Context) {
    const userService = new UserService()

    Mock.when(userService, 'findById').returnThis()

    assert.deepEqual(await userService.findById(1), userService)
  }
}
