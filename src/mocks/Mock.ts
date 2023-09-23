/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { createSandbox } from 'sinon'
import { MockBuilder } from '#src/mocks/MockBuilder'
import type {
  Spy,
  SpyMethod,
  StubMethod,
  SpyInstance,
  StubInstance
} from '#src'

export class Mock {
  /**
   * Sinon sandbox instance.
   */
  public static sandbox = createSandbox()

  /**
   * Create a mock builder instance for the given object
   * and a method of the object.
   */
  public static when<T = any>(object: T, method: keyof T): MockBuilder {
    return new MockBuilder(object, method, Mock.sandbox)
  }

  /**
   * Create a spy function for a given object.
   */
  public static spy<T = any>(object: T): SpyInstance<T>

  /**
   * Create a spy function for a given object method.
   */
  public static spy<T = any>(object: T, method: keyof T): SpyMethod<T[keyof T]>

  public static spy<T = any>(object: T, method?: keyof T) {
    return Mock.sandbox.spy(object, method)
  }

  /**
   * Create a stub function for a given object.
   */
  public static stub<T = any>(object: T): StubInstance<T>

  /**
   * Create a stub function for a given object method.
   */
  public static stub<T = any>(
    object: T,
    method: keyof T
  ): StubMethod<T[keyof T]>

  public static stub<T = any>(object: T, method?: keyof T) {
    return Mock.sandbox.stub(object, method)
  }

  /**
   * Create a fake function to be used as a spy.
   */
  public static fake(): Spy {
    return Mock.sandbox.fake()
  }

  /**
   * Restore all mocks to default.
   */
  public static restoreAll(): void {
    Mock.sandbox.restore()
    Mock.sandbox.resetHistory()
    Mock.sandbox.resetBehavior()
    Mock.sandbox.reset()
  }
}
