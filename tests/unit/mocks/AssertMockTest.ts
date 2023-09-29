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
  public async shouldBeAbleToAssertSpyWasNotCalled({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    assert.notCalled(spy)
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
  public async shouldBeAbleToAssertSpyWasCalledWithMatchingArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWithMatch(spy, 1)
  }

  @Test()
  public async shouldBeAbleToAssertSpyWasCalledNotWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWith(spy, 1)
    assert.notCalledWith(spy, 2)
  }

  @Test()
  public async shouldBeAbleToAssertSpyWasCalledNotWithMatchingArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWithMatch(spy, 1)
    assert.notCalledWithMatch(spy, 2)
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
  @Fails()
  public async shouldFailWhenAssertingThatSpyWasNotCalledWithMatchingArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.calledWithMatch(spy, 2)
  }

  @Test()
  @Fails()
  public async shouldFailWhenAssertingThatSpyWasCalledWithArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.notCalledWith(spy, 1)
  }

  @Test()
  @Fails()
  public async shouldFailWhenAssertingThatSpyWasCalledWithMatchingArgs({ assert }: Context) {
    const userService = new UserService()

    const spy = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.notCalledWithMatch(spy, 1)
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
  public async shouldBeAbleToAssertOtherSpyWasNotCalledBefore({ assert }: Context) {
    const userService = new UserService()

    const spyFind = Mock.spy(userService, 'find')
    const spyFindSync = Mock.spy(userService, 'findSync')

    await userService.find()
    userService.findSync()

    assert.notCalledBefore(spyFindSync, spyFind)
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
  public async shouldBeAbleToAssertOtherSpyWasNotCalledAfter({ assert }: Context) {
    const userService = new UserService()

    const spyFind = Mock.spy(userService, 'find')
    const spyFindById = Mock.spy(userService, 'findById')

    await userService.findById(1)

    assert.notCalledAfter(spyFindById, spyFind)
  }
}
