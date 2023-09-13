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

Assert.macro('calledBefore', function (mock: SinonSpy, beforeMock: SinonSpy) {
  return this.isTrue(mock.calledBefore(beforeMock))
})

Assert.macro('calledAfter', function (mock: SinonSpy, afterMock: SinonSpy) {
  return this.isTrue(mock.calledAfter(afterMock))
})

Assert.macro('returned', function (mock: SinonSpy, value: any) {
  const hasReturned = mock.returned(value)

  if (!hasReturned) {
    return this.deepEqual(mock.returnValues[0], value)
  }

  return this.isTrue(hasReturned)
})

Assert.macro('threw', function (mock: SinonSpy, value?: any) {
  const hasThrew = mock.threw(value)

  if (!hasThrew) {
    return this.deepEqual(mock.returnValues[0], value)
  }

  return this.isTrue(hasThrew)
})

Assert.macro('resolved', async function (mock: SinonSpy, value?: any) {
  const hasResolved = mock.returned(value)

  if (!hasResolved) {
    return this.deepEqual(await mock.returnValues[0], value)
  }

  return this.isTrue(hasResolved)
})

Assert.macro('rejected', async function (mock: SinonSpy, value?: any) {
  return this.rejects(() => mock.returnValues[0], value)
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
    hey(): void
    /**
     * Assert that the given mock was called.
     */
    called(mock: SinonSpy): void
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
     * Assert that the given mock was called after
     * an other determined mock.
     */
    calledAfter(mock: SinonSpy, afterMock: SinonSpy): void
    /**
     * Assert that the given mock returned a determined value.
     */
    returned(mock: SinonSpy, value: any): void
    /**
     * Assert that the given threw. Could also
     * assert the value that has been thrown.
     */
    threw(mock: SinonSpy, value?: any): void
    /**
     * Assert that the given mock resolved. Could also
     * assert the value that has been returned.
     */
    resolved(mock: SinonSpy, value?: any): Promise<void>
    /**
     * Assert that the given mock rejected. Could also
     * assert the value that has been returned.
     */
    rejected(mock: SinonSpy, value?: any): Promise<void>
  }
}
