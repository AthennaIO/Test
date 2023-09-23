/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { debug } from '#src/debug'
import { test as japaTest } from '#src'
import type { Group } from '@japa/runner'
import type { TestOptions } from '#src'
import { Is, ObjectBuilder, Options } from '@athenna/common'
import { AfterAllHookException } from '#src/exceptions/AfterAllHookException'
import { BeforeAllHookException } from '#src/exceptions/BeforeAllHookException'
import { AfterEachHookException } from '#src/exceptions/AfterEachHookException'
import { BeforeEachHookException } from '#src/exceptions/BeforeEachHookException'

export class TestConverter {
  /**
   * The test class instance.
   */
  private readonly testClass: any

  /**
   * The test class constructor.
   */
  private readonly TestClass: any

  /**
   * The test class name.
   */
  private readonly className: string

  public constructor(Test: any) {
    this.testClass = new Test()
    this.TestClass = this.testClass.constructor
    this.className = this.TestClass.name
  }

  public registerGroup() {
    japaTest.group(this.className, group => {
      this.beforeAll(group)
      this.beforeEach(group)
      this.afterAll(group)
      this.afterEach(group)
      this.tests()
    })
  }

  /**
   * Register all @Test annotations.
   */
  public tests() {
    const tests =
      Reflect.getMetadata('tests', this.TestClass) ||
      new ObjectBuilder({ referencedValues: true })

    tests.forEachKey(method => {
      const closure = Options.bind(this.testClass, method)
      const options: TestOptions = tests.get(method)

      if (!closure) {
        this.debugClosure('@Test()', method)

        return
      }

      const test = japaTest(options.title)

      Options.whenDefined(options.pin, () => test.pin())
      Options.whenDefined(options.fails, () => test.fails())
      Options.whenDefined(options.waitForDone, () => test.waitForDone())
      Options.whenDefined(options.disableTimeout, () => test.disableTimeout())

      Options.whenDefined(options.tags, tags => test.tags(tags))
      Options.whenDefined(options.with, cases => test.with(cases))
      Options.whenDefined(options.retry, times => test.retry(times))
      Options.whenDefined(options.setup, setup => test.setup(setup))
      Options.whenDefined(options.timeout, timeout => test.timeout(timeout))
      Options.whenDefined(options.cleanup, cleanup => test.cleanup(cleanup))
      Options.whenDefined(options.teardown, teardown => test.teardown(teardown))
      Options.whenDefined(options.skip, skip => {
        if (Is.Boolean(skip)) {
          test.skip(skip)

          return
        }

        test.skip(true, skip)
      })

      test.run(closure)
    })
  }

  /**
   * Register all @BeforeAll annotations.
   */
  public beforeAll(group: Group) {
    const hooks = Reflect.getMetadata('hooks:beforeAll', this.TestClass) || []

    hooks.forEach(({ method }) => {
      const closure = Options.bind(this.testClass, method)

      if (!closure) {
        this.debugClosure('@BeforeAll()', method)

        return
      }

      const hookHandler = this.handleHook(
        method,
        closure,
        BeforeAllHookException
      )

      group.setup(hookHandler)
    })
  }

  /**
   * Register all @BeforeEach annotations.
   */
  public beforeEach(group: Group) {
    const hooks = Reflect.getMetadata('hooks:beforeEach', this.TestClass) || []

    hooks.forEach(({ method }) => {
      const closure = Options.bind(this.testClass, method)

      if (!closure) {
        this.debugClosure('@BeforeEach()', method)

        return
      }

      const hookHandler = this.handleHook(
        method,
        closure,
        BeforeEachHookException
      )

      group.each.setup(hookHandler)
    })
  }

  /**
   * Register all @AfterAll annotations.
   */
  public afterAll(group: Group) {
    const hooks = Reflect.getMetadata('hooks:afterAll', this.TestClass) || []

    hooks.forEach(({ method }) => {
      const closure = Options.bind(this.testClass, method)

      if (!closure) {
        this.debugClosure('@AfterAll()', method)

        return
      }

      const hookHandler = this.handleHook(
        method,
        closure,
        AfterAllHookException
      )

      group.teardown(hookHandler)
    })
  }

  /**
   * Register all @AfterEach annotations.
   */
  public afterEach(group: Group) {
    const hooks = Reflect.getMetadata('hooks:afterEach', this.TestClass) || []

    hooks.forEach(({ method }) => {
      const closure = Options.bind(this.testClass, method)

      if (!closure) {
        this.debugClosure('@AfterEach()', method)

        return
      }

      const hookHandler = this.handleHook(
        method,
        closure,
        AfterEachHookException
      )

      group.each.teardown(hookHandler)
    })
  }

  /**
   * Creates a new closure to handle hook execution and errors.
   */
  private handleHook(method: string, closure: any, Exception: any) {
    return async () => {
      try {
        await closure()
      } catch (error) {
        const exception = new Exception(method, this.className, error)

        console.error(await exception.prettify())
        process.exit(1)
      }
    }
  }

  /**
   * Create a new debug log of an undefined closure in the test
   * class.
   */
  private debugClosure(annotation: string, method: string) {
    debug(
      'Skipping registration of %s annotation for %s method. The method does not exist in %s class.',
      annotation,
      method,
      this.className
    )
  }
}
