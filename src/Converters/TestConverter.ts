/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { TestOptions } from '#src'
import { Is } from '@athenna/common'
import { test as japaTest } from '@japa/runner'

export class TestConverter {
  /**
   * Convert test options of decorators to Japa test options.
   */
  public static async convert(closure: any, options: TestOptions) {
    if (!closure) {
      return
    }

    const test = japaTest(options.title)

    this.whenDefined(options.pin, () => test.pin())
    this.whenDefined(options.fails, () => test.fails())
    this.whenDefined(options.waitForDone, () => test.waitForDone())
    this.whenDefined(options.disableTimeout, () => test.disableTimeout())

    this.whenDefined(options.tags, tags => test.tags(tags))
    this.whenDefined(options.with, cases => test.with(cases))
    this.whenDefined(options.retry, times => test.retry(times))
    this.whenDefined(options.setup, setup => test.setup(setup))
    this.whenDefined(options.timeout, timeout => test.timeout(timeout))
    this.whenDefined(options.cleanup, cleanup => test.cleanup(cleanup))
    this.whenDefined(options.teardown, teardown => test.teardown(teardown))
    this.whenDefined(options.skip, skip => {
      if (Is.Boolean(skip)) {
        test.skip(skip)

        return
      }

      test.skip(true, skip)
    })

    test.run(closure)
  }

  /**
   * Execute some closure when statement is defined.
   */
  private static whenDefined(statement: any, closure: any) {
    if (!Is.Defined(statement)) {
      return
    }

    closure(statement)
  }
}
