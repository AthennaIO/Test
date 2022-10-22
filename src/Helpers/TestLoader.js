/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'node:path'
import { Folder, Module } from '@athenna/common'

export class TestLoader {
  /**
   * Return all commands from test package.
   *
   * @return {any[]}
   */
  static loadCommands() {
    return [import('#src/Commands/Test'), import('#src/Commands/Make/Test')]
  }

  /**
   * Return all custom templates from test package.
   *
   * @return {any[]}
   */
  static loadTemplates() {
    const dirname = Module.createDirname(import.meta.url)
    const templatesPath = join(dirname, '..', '..', 'templates')

    return new Folder(templatesPath).loadSync().getFilesByPattern('**/*.ejs')
  }
}
