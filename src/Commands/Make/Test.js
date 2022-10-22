/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path } from '@athenna/common'
import { Command } from '@athenna/artisan'

export class MakeTest extends Command {
  /**
   * The name and signature of the console command.
   *
   * @return {string}
   */
  get signature() {
    return 'make:test <name>'
  }

  /**
   * The console command description.
   *
   * @return {string}
   */
  get description() {
    return 'Make a new test file.'
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
      .option('-u, --unit', 'Create the test inside unit folder.', false)
      .option('--no-lint', 'Do not run eslint in the facade.', true)
      .option(
        '--no-class',
        'Create the test using the function template.',
        true,
      )
  }

  /**
   * Execute the console command.
   *
   * @param {string} name
   * @param {any} options
   * @return {Promise<void>}
   */
  async handle(name, options) {
    let resource = 'Test'
    let template = 'test'
    let path = Path.tests(`E2E/${name}.js`)

    if (!options.class) {
      resource = 'TestFn'
      template = 'testFn'
    }

    if (options.unit) {
      path = Path.tests(`Unit/${name}.js`)
    }

    this.title(`MAKING ${resource}\n`, 'bold', 'green')

    const file = await this.makeFile(path, template, options.lint)

    this.success(`${resource} ({yellow} "${file.name}") successfully created.`)
  }
}
