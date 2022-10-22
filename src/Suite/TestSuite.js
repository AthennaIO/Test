/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Module } from '@athenna/common'
import { Ignite } from '@athenna/core'
import { TestContext } from '@japa/runner'

import { TestRequest } from '#src/index'

export class TestSuite {
  /**
   * Get the cli arguments when running the tests.
   *
   * @return {string[]}
   */
  static getArgs() {
    return process.argv[2] === 'test'
      ? process.argv.slice(3)
      : process.argv.slice(2)
  }

  /**
   * Resolve the import of the test files.
   *
   * @param {string} filePath
   * @return {Promise<void>}
   */
  static async importer(filePath) {
    const Test = await Module.get(await Module.import(filePath))

    if (!Test) {
      return
    }

    new Test().convert()
  }

  /**
   * Creates the unit test suite.
   *
   * @param {any} suite
   */
  static unitSuite(suite) {
    return suite.setup(async () => {
      TestContext.macro('request', () => {})

      return () => {}
    })
  }

  /**
   * Creates the cli test suite.
   *
   * @param {any} suite
   */
  static cliEnd2EndSuite(suite) {
    return suite.setup(async () => {
      const application = await new Ignite().fire()

      TestContext.macro('request', () => {})

      await application.bootArtisan()

      return async () => {}
    })
  }

  /**
   * Creates the http test suite.
   *
   * @param {any} suite
   */
  static httpEnd2EndSuite(suite) {
    return suite.setup(async () => {
      const application = await new Ignite().fire()

      await application.bootArtisan()
      await application.bootHttpServer()

      TestContext.macro('request', new TestRequest())

      return async () => await application.shutdownHttpServer()
    })
  }
}
