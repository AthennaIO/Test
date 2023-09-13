/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, Mock, type Context, Fails } from '#src'
import { UserService } from '#tests/fixtures/UserService'

export default class AssertMockTest {
  @Test()
  public async shouldBeAbleToAssertSpyWasCalled({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.called(spy)
  }

  @Test()
  public async shouldBeAbleToAssertSpyWasCalledOnce({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledOnce(spy)
    assert.equal(spy.callCount, 1)
  }

  @Test()
  public async shouldBeAbleToAssertSpyWasCalledTimes({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledTimes(spy, 1)
    assert.equal(spy.callCount, 1)
  }

  @Test()
  public async shouldBeAbleToAssertSpyWasCalledWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWith(spy, 1)
  }

  @Test()
  @Fails()
  public async shouldFailWhenAssertingThatSpyWasNotCalledWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWith(spy, 2)
  }

  @Test()
  public async shouldBeAbleToAssertSpyWasCalledOnceWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledOnceWith(spy, 1)
  }

  @Test()
  @Fails()
  public async shouldFailIfSpyWasCalledMoreThemOnceWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    // call twice
    await userService.findById(1)
    await userService.findById(1)

    assert.calledOnceWith(spy, 1)
  }

  @Test()
  public async shouldBeAbleToAssertSpyWasCalledTimesWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledTimesWith(spy, 1, 1)
  }

  @Test()
  @Fails()
  public async shouldFailIfSpyWasCalledMoreThemTimesWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    // call twice
    await userService.findById(1)
    await userService.findById(1)

    assert.calledTimesWith(spy, 1, 1)
  }

  @Test()
  public async shouldBeAbleToAssertOtherSpyWasCalledBefore({ assert }: Context) {
    const userService = new UserService()

    const spyFind = Mock.spy(userService, 'find')
    const spyFindById = Mock.spy(userService, 'findById')

    await userService.find()
    await userService.findById(1)

    assert.calledBefore(spyFind, spyFindById)
  }

  @Test()
  public async shouldBeAbleToAssertOtherSpyWasCalledAfter({ assert }: Context) {
    const userService = new UserService()

    const spyFind = Mock.spy(userService, 'find')
    const spyFindById = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledAfter(spyFind, spyFindById)
  }

  @Test()
  public async shouldBeAbleToAssertThatSpyHasReturnedAValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findSync')

    userService.findSync()

    assert.returned(spy, [
      {
        id: 1,
        name: 'João Lenon',
        email: 'lenon@athenna.io'
      }
    ])
  }

  @Test()
  @Fails()
  public async shouldFailWhenSpyHasNotReturnedTheGivenValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findSync')

    userService.findSync()

    assert.returned(spy, [
      {
        id: 2,
        name: 'João Lenon',
        email: 'lenon@athenna.io'
      }
    ])
  }

  @Test()
  public async shouldBeAbleToAssertThatSpyHasResolvedAValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'find')

    await userService.find()

    await assert.resolved(spy, [
      {
        id: 1,
        name: 'João Lenon',
        email: 'lenon@athenna.io'
      }
    ])
  }

  @Test()
  @Fails()
  public async shouldFailWhenSpyHasNotResolvedTheGivenValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findSync')

    userService.findSync()

    await assert.resolved(spy, [
      {
        id: 2,
        name: 'João Lenon',
        email: 'lenon@athenna.io'
      }
    ])
  }

  @Test()
  public async shouldBeAbleToAssertThatSpyHasThrewAValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'throw')

    assert.throws(() => userService.throw(), 'User not found')
    assert.threw(spy, 'Error')
  }

  @Test()
  @Fails()
  public async shouldFailWhenSpyHasNotThrewTheGivenValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'throw')

    assert.throws(() => userService.throw(), 'User not found')
    assert.threw(spy, 'OtherError')
  }

  @Test()
  public async shouldBeAbleToAssertThatSpyHasRejectedAValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'reject')

    await assert.rejects(() => userService.reject(), 'User not found')
    await assert.rejected(spy, 'User not found')
  }

  @Test()
  @Fails()
  public async shouldFailWhenSpyHasNotRejectedTheGivenValue({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'reject')

    await assert.rejects(() => userService.reject(), 'User not found')
    await assert.rejected(spy, 'OtherError')
  }
}
