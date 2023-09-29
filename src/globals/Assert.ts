/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Assert } from '@japa/assert'
import type { SinonSpy } from 'sinon'

Assert.macro('called', function (mock: SinonSpy) {
  return this.isTrue(mock.called)
})

Assert.macro('calledOnce', function (mock: SinonSpy) {
  return this.deepEqual(mock.callCount, 1)
})

Assert.macro('calledTimes', function (mock: SinonSpy, times: number) {
  return this.deepEqual(mock.callCount, times)
})

Assert.macro('calledWith', function (mock: SinonSpy, ...args: any[]) {
  const hasCalledWith = mock.calledWith(...args)

  if (!hasCalledWith) {
    return this.deepEqual(mock.args[0], args)
  }

  return this.isTrue(hasCalledWith)
})

Assert.macro('calledOnceWith', function (mock: SinonSpy, ...args: any[]) {
  return this.isTrue(mock.calledOnceWith(...args))
})

Assert.macro(
  'calledTimesWith',
  function (mock: SinonSpy, times: number, ...args: any[]) {
    this.calledTimes(mock, times)
    this.calledWith(mock, ...args)
  }
)

Assert.macro('calledWithMatch', function (mock: SinonSpy, ...args: any[]) {
  const hasCalledWithMatch = mock.calledWithMatch(...args)

  if (!hasCalledWithMatch) {
    return this.deepEqual(mock.args[0], args)
  }

  return this.isTrue(hasCalledWithMatch)
})

Assert.macro('calledBefore', function (mock: SinonSpy, beforeMock: SinonSpy) {
  return this.isTrue(mock.calledBefore(beforeMock))
})

Assert.macro('calledAfter', function (mock: SinonSpy, afterMock: SinonSpy) {
  return this.isTrue(mock.calledAfter(afterMock))
})

Assert.macro('notCalled', function (mock: SinonSpy) {
  return this.isTrue(mock.notCalled)
})

Assert.macro('notCalledWith', function (mock: SinonSpy, ...args: any[]) {
  const hasCalledWith = mock.calledWith(...args)

  if (hasCalledWith) {
    return this.notDeepEqual(mock.args[0], args)
  }

  return this.isFalse(hasCalledWith)
})

Assert.macro('notCalledWithMatch', function (mock: SinonSpy, ...args: any[]) {
  const hasCalledWithMatch = mock.calledWithMatch(...args)

  if (hasCalledWithMatch) {
    return this.notDeepEqual(mock.args[0], args)
  }

  return this.isFalse(hasCalledWithMatch)
})

Assert.macro('calledOnceWith', function (mock: SinonSpy, ...args: any[]) {
  return this.isTrue(mock.calledOnceWith(...args))
})

Assert.macro(
  'calledTimesWith',
  function (mock: SinonSpy, times: number, ...args: any[]) {
    this.calledTimes(mock, times)
    this.calledWith(mock, ...args)
  }
)

Assert.macro('calledBefore', function (mock: SinonSpy, beforeMock: SinonSpy) {
  return this.isTrue(mock.calledBefore(beforeMock))
})

Assert.macro(
  'notCalledBefore',
  function (mock: SinonSpy, beforeMock: SinonSpy) {
    return this.isFalse(mock.calledBefore(beforeMock))
  }
)

Assert.macro('calledAfter', function (mock: SinonSpy, afterMock: SinonSpy) {
  return this.isTrue(mock.calledAfter(afterMock))
})

Assert.macro('notCalledAfter', function (mock: SinonSpy, afterMock: SinonSpy) {
  return this.isFalse(mock.calledAfter(afterMock))
})

export {}

declare module '@japa/assert' {
  export interface Assert {
    throws(fn: () => any, errType: any, message?: string): void
    doesNotThrows(fn: () => any, errType: any, message?: string): void
    rejects(
      fn: () => any | Promise<any>,
      errType: any,
      message?: string
    ): Promise<any>
    doesNotRejects(
      fn: () => any | Promise<any>,
      errType: any,
      message?: string
    ): Promise<any>
    /**
     * Assert that the given mock was called.
     */
    called(mock: SinonSpy): void
    /**
     * Assert that the given mock was not called.
     */
    notCalled(mock: SinonSpy): void
    /**
     * Assert that the given mock was called only once.
     */
    calledOnce(mock: SinonSpy): void
    /**
     * Assert that the given mock was called the
     * determined number of times.
     */
    calledTimes(mock: SinonSpy, times: number): void
    /**
     * Assert that the given mock was called with the
     * determined arguments.
     */
    calledWith(mock: SinonSpy, ...args: any[]): void
    /**
     * Assert that the given mock was not called with the
     * determined arguments.
     */
    notCalledWith(mock: SinonSpy, ...args: any[]): void
    /**
     * Assert that the given mock was called with the
     * arguments matching some of the given arguments.
     * This is the same of doing:
     * `assert.calledWith(mock, Mock.match(arg1), Mock.match(arg2))`
     *
     * @example
     * ```ts
     * console.log('hello', 'world', '!')
     * assert.calledWithMatch(console.log, 'hello', 'world') // passes
     * ```
     */
    calledWithMatch(mock: SinonSpy, ...args: any[]): void
    /**
     * Assert that the given mock was not called with the
     * arguments matching some of the given arguments.
     * This is the same of doing:
     * `assert.notCalledWith(mock, Mock.match(arg1), Mock.match(arg2))`
     *
     * @example
     * ```ts
     * console.log('hello', 'world', '!')
     * assert.notCalledWithMatch(console.log, 'hello', 'world') // fails
     * ```
     */
    notCalledWithMatch(mock: SinonSpy, ...args: any[]): void
    /**
     * Assert that the given mock was called only once
     * with the determined arguments.
     */
    calledOnceWith(mock: SinonSpy, ...args: any[]): void
    /**
     * Assert that the given mock was called the
     * determined number of times with always the determined
     * arguments.
     */
    calledTimesWith(mock: SinonSpy, times: number, ...args: any[]): void
    /**
     * Assert that the given mock was called before
     * an other determined mock.
     */
    calledBefore(mock: SinonSpy, beforeMock: SinonSpy): void
    /**
     * Assert that the given mock was not called before
     * an other determined mock.
     */
    notCalledBefore(mock: SinonSpy, beforeMock: SinonSpy): void
    /**
     * Assert that the given mock was called after
     * an other determined mock.
     */
    calledAfter(mock: SinonSpy, afterMock: SinonSpy): void
    /**
     * Assert that the given mock was not called after
     * an other determined mock.
     */
    notCalledAfter(mock: SinonSpy, afterMock: SinonSpy): void
  }
}
