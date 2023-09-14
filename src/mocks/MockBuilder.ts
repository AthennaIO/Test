/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Stub } from '#src'
import type { SinonSandbox } from 'sinon'
import type { Exception } from '@athenna/common'

export class MockBuilder {
  public constructor(
    private object: any,
    private method: any,
    private sandbox: SinonSandbox
  ) {}

  /**
   * Mock the method to return the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').return('Hello World')
   *
   * mock.called // false
   * ```
   */
  public return<T = any>(value: T): Stub {
    const stub = this.sandbox.stub(this.object, this.method)

    stub.returns(value)

    return stub
  }

  /**
   * Mock the method to throw the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').throw('Hello World')
   *
   * mock.called // false
   * ```
   */
  public throw(value: string | Error | Exception): Stub {
    const stub = this.sandbox.stub(this.object, this.method)

    stub.throws(value)

    return stub
  }

  /**
   * Mock the method to resolve returning the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').resolve('Hello World')
   *
   * mock.called // false
   * ```
   */
  public resolve<T = any>(value: T): Stub {
    const stub = this.sandbox.stub(this.object, this.method)

    stub.resolves(value)

    return stub
  }

  /**
   * Mock the method to reject returning the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').reject('Hello World')
   *
   * mock.called // false
   * ```
   */
  public reject<T = any>(value: T): Stub {
    const stub = this.sandbox.stub(this.object, this.method)

    stub.rejects(value)

    return stub
  }
}
