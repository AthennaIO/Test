/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'node:path'
import { debug } from '#src/debug'
import { Module } from '@athenna/common'
import { TestConverter } from '#src/converters/TestConverter'

export class Importer {
  /**
   * Import some japa test file and resolve the that class if exists.
   */
  public static async import(fileUrl: URL) {
    try {
      const Test = await Module.getFrom(fileUrl.href)

      if (!Test) {
        const fileName = parse(fileUrl.href).name
        debug(
          'skipping class registration of %s file. there is no class being exported at %s path.',
          fileName,
          fileUrl.href
        )
        return
      }

      new TestConverter(Test).registerGroup()
    } catch (err) {
      if (!err.message) {
        console.error(
          `Error while importing ${parse(fileUrl.href).name}:\n`,
          err
        )
        process.exit(1)
      }

      throw err
    }
  }
}
