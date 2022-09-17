/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { HttpLoader } from '@athenna/http'
import { CoreLoader } from '@athenna/core'
import { ArtisanLoader, ConsoleKernel } from '@athenna/artisan'

import { TestLoader } from '#src/index'

export class Kernel extends ConsoleKernel {
  /**
   * Register the commands for the application.
   *
   * @return {any[]}
   */
  get commands() {
    return [
      ...ArtisanLoader.loadCommands(),
      ...HttpLoader.loadCommands(),
      ...TestLoader.loadCommands(),
      ...CoreLoader.loadCommands(),
    ]
  }

  /**
   * Register custom templates files.
   *
   * @return {any[]}
   */
  get templates() {
    return [...HttpLoader.loadTemplates(), ...TestLoader.loadTemplates(), ...ArtisanLoader.loadTemplates()]
  }
}
