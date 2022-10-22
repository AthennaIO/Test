/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'

export { test }
export * from './Http/TestRequest.js'
export * from './Http/TestResponse.js'
export * from './Suite/TestSuite.js'
export * from './Helpers/TestLoader.js'

export class Test {
  /**
   * Set the test timeout for all tests inside the group.
   *
   * @example
   *  Default is 2000
   *
   * @return {number}
   */
  get timeout() {
    return 2000
  }

  /**
   * Set the test names that can run.
   *
   * @example
   *  Default is null
   *
   * @return {string[]}
   */
  get runOnly() {
    return null
  }

  /**
   * Get all test methods that doesn't start with "it", "test", and "should", ignoring constructor
   * and test events.
   *
   * @example
   *  async testMethodImpl() {} // BAD!!! This method will be considered a test.
   *  async myMethodImpl() {} // GOOD!!! This method will not be considered a test.
   *
   * @return {string[]}
   */
  get testNames() {
    const removeMethods = [
      'constructor',
      'beforeAll',
      'beforeEach',
      'afterAll',
      'afterEach',
    ]

    return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(
      name =>
        !removeMethods.includes(name) &&
        (name.startsWith('it') ||
          name.startsWith('test') ||
          name.startsWith('should')),
    )
  }

  /**
   * Convert the test to Japa functions.
   *
   * @return {void}
   */
  convert() {
    test.group(this.constructor.name, suite => {
      if (this.beforeAll) suite.setup(this.beforeAll.bind(this))
      if (this.beforeEach) suite.each.setup(this.beforeEach.bind(this))
      if (this.afterAll) suite.teardown(this.afterAll.bind(this))
      if (this.afterEach) suite.each.teardown(this.afterEach.bind(this))

      this.testNames.forEach(testName => {
        const japaTest = test(testName, this[testName].bind(this)).timeout(
          this.timeout,
        )

        if (!this.runOnly || !this.runOnly.length) {
          return
        }

        if (this.runOnly[0] === '*') {
          japaTest.pin()

          return
        }

        this.runOnly.forEach(name => {
          if (name !== testName) {
            return
          }

          japaTest.pin()
        })
      })
    })
  }
}
