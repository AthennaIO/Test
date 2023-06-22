/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { pathToFileURL } from 'node:url'
import { test as japaTest } from '@japa/runner'
import { Module, ObjectBuilder } from '@athenna/common'
import { TestConverter } from '#src/converters/TestConverter'
import { AfterAllHookException } from '#src/exceptions/AfterAllHookException'
import { AfterEachHookException } from '#src/exceptions/AfterEachHookException'
import { BeforeAllHookException } from '#src/exceptions/BeforeAllHookException'
import { BeforeEachHookException } from '#src/exceptions/BeforeEachHookException'

export class Importer {
  /**
   * Simple imports some file path by href.
   */
  public static async simpleImport(filePath: string): Promise<any> {
    return import(pathToFileURL(filePath).href)
  }

  /**
   * Import some japa test file and resolve the that class if exists.
   */
  public static async import(filePath: string) {
    const Test = await Module.get(Importer.simpleImport(filePath))

    if (!Test) {
      return
    }

    const test = new Test()
    const bind = (method: string) => {
      const closure = test[method]

      if (!closure) {
        return null
      }

      return closure.bind(test)
    }

    const {
      tests,
      afterAllHooks,
      afterEachHooks,
      beforeAllHooks,
      beforeEachHooks,
    } = Importer.getClassMetadata(Test)

    japaTest.group(Test.name, group => {
      beforeAllHooks.forEach(({ method }) => {
        const closure = bind(method)

        if (!closure) return

        group.setup(
          Importer.handleHook(
            method,
            Test.name,
            closure,
            BeforeAllHookException,
          ),
        )
      })

      afterAllHooks.forEach(({ method }) => {
        const closure = bind(method)

        if (!closure) return

        group.teardown(
          Importer.handleHook(
            method,
            Test.name,
            closure,
            AfterAllHookException,
          ),
        )
      })

      beforeEachHooks.forEach(({ method }) => {
        const closure = bind(method)

        if (!closure) return

        group.each.setup(
          Importer.handleHook(
            method,
            Test.name,
            closure,
            BeforeEachHookException,
          ),
        )
      })

      afterEachHooks.forEach(({ method }) => {
        const closure = bind(method)

        if (!closure) return

        group.each.teardown(
          Importer.handleHook(
            method,
            Test.name,
            closure,
            AfterEachHookException,
          ),
        )
      })

      Object.keys(tests.get()).forEach(method =>
        TestConverter.convert(bind(method), tests.get(method)),
      )
    })
  }

  /**
   * Creates a new closure to handle hook execution and errors.
   */
  private static handleHook(
    method: string,
    className: string,
    closure: any,
    Exception: any,
  ) {
    return async () => {
      try {
        await closure()
      } catch (error) {
        const exception = new Exception(method, className, error)

        console.error(await exception.prettify())
        process.exit(1)
      }
    }
  }

  /**
   * Get all the class metadata or return default empty values to prevent
   * errors.
   */
  private static getClassMetadata(target: any) {
    return {
      tests:
        Reflect.getMetadata('tests', target) ||
        new ObjectBuilder({ referencedValues: true }),
      afterAllHooks: Reflect.getMetadata('hooks:afterAll', target) || [],
      afterEachHooks: Reflect.getMetadata('hooks:afterEach', target) || [],
      beforeAllHooks: Reflect.getMetadata('hooks:beforeAll', target) || [],
      beforeEachHooks: Reflect.getMetadata('hooks:beforeEach', target) || [],
    }
  }
}
