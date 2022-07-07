/**
 * @athenna/artisan
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { HttpCommandsLoader } from '@athenna/http'
import { ArtisanLoader, ConsoleKernel } from '@athenna/artisan'

import { TestCommandsLoader } from '#src/index'

export class Kernel extends ConsoleKernel {
  /**
   * Register the commands for the application.
   *
   * @return {any[]}
   */
  get commands() {
    return [...ArtisanLoader.loadCommands(), ...HttpCommandsLoader.loadCommands(), ...TestCommandsLoader.loadCommands()]
  }

  /**
   * Register custom templates files.
   *
   * @return {import('@secjs/utils').File[] | Promise<any[]>}
   */
  get templates() {
    return [...HttpCommandsLoader.loadTemplates(), ...TestCommandsLoader.loadTemplates()]
  }
}
