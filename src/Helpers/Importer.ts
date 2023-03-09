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
import { TestConverter } from '#src/Converters/TestConverter'

export class Importer {
  /**
   * Simple import some file path by href.
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
    const bind = (method: string) => test[method].bind(test)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Test)
    const afterAllHooks = Reflect.getMetadata('hooks:afterAll', Test)
    const afterEachHooks = Reflect.getMetadata('hooks:afterEach', Test)
    const beforeAllHooks = Reflect.getMetadata('hooks:beforeAll', Test)
    const beforeEachHooks = Reflect.getMetadata('hooks:beforeEach', Test)

    japaTest.group(Test.name, group => {
      beforeAllHooks.forEach(({ method }) => group.setup(bind(method)))
      afterAllHooks.forEach(({ method }) => group.teardown(bind(method)))
      beforeEachHooks.forEach(({ method }) => group.each.setup(bind(method)))
      afterEachHooks.forEach(({ method }) => group.each.teardown(bind(method)))

      Object.keys(tests.get()).forEach(method =>
        TestConverter.convert(bind(method), tests.get(method)),
      )
    })
  }
}
