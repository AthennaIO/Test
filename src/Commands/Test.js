/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Command } from '@athenna/artisan'
import { Module, Path } from '@athenna/common'

export class Test extends Command {
  /**
   * The name and signature of the console command.
   *
   * @return {string}
   */
  get signature() {
    return 'test'
  }

  /**
   * The console command description.
   *
   * @return {string}
   */
  get description() {
    return 'Run the tests of Athenna application.'
  }

  /**
   * Set additional flags in the commander instance.
   * This method is executed when registering your command.
   *
   * @param {import('commander').Command} commander
   * @return {import('commander').Command}
   */
  addFlags(commander) {
    return commander
      .option('--debug', 'Enable debug mode to see more logs.', false)
      .option('--unit', 'Run unit tests.', false)
      .option('--e2e', 'Run e2e tests.', false)
      .option(
        '-e, --env <env>',
        'Change the environment where the test will run. Default is "test"',
        'test',
      )
  }

  /**
   * Execute the console command.
   *
   * @params {any} options
   * @return {Promise<void>}
   */
  async handle(options) {
    Config.configs.clear()

    process.env.NODE_ENV = options.env
    process.env.BOOT_LOGS = 'false'

    const protectedArgs = ['--e2e', '--unit', '--debug']

    process.argv = process.argv.filter(arg => !protectedArgs.includes(arg))

    if (options.e2e) {
      process.argv.push('E2E')
    }

    if (options.unit) {
      process.argv.push('Unit')
    }

    if (options.debug) {
      process.env.DEBUG = 'api:*'
    }

    await Module.import(Path.tests(`main.${Path.ext()}`))
  }
}
