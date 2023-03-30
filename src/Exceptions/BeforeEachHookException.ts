/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color, Exception, Is } from '@athenna/common'

export class BeforeEachHookException extends Exception {
  public constructor(method: string, className: string, error: any) {
    if (!Is.Exception(error)) {
      error = error.toAthennaException()
    }

    error.message = `An exception has ocurred while running the ${Color.green.bold(
      '@BeforeEach',
    )} hook of ${Color.yellow.bold(method)} method in class ${Color.yellow.bold(
      className,
    )} class.\n\n${Color.gray.bold.bgYellow(' MESSAGE ')}\n\n${error.message}`

    super({
      code: 'E_BEFORE_EACH_HOOK',
      message: error.message,
      help: error.help,
      stack: error.stack,
    })
  }
}
