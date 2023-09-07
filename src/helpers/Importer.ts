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
  public static async import(filePath: string) {
    const Test = await Module.getFrom(filePath)

    if (!Test) {
      const fileName = parse(filePath).name

      debug(
        'Skipping class registration of %s file. There is no class being exported at %s path.',
        fileName,
        filePath
      )

      return
    }

    new TestConverter(Test).registerGroup()
  }
}
