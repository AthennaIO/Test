/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color, Exception, Is } from '@athenna/common'

export class BeforeAllHookException extends Exception {
  public constructor(method: string, className: string, error: any) {
    if (!Is.Exception(error)) {
      error = error.toAthennaException()
    }

    const hook = Color.green.bold('@BeforeAll')
    const classMethod = Color.yellow.bold(`${className}.${method}`)
    const message = `${Color.gray.bold.bgYellow(' MESSAGE ')}\n\n${
      error.message ? error.message : JSON.stringify(error, null, 2)
    }`

    error.message = `An exception has occurred while running the ${hook} hook in ${classMethod} method.\n\n${message}`

    super({
      code: 'E_BEFORE_ALL_HOOK',
      message: error.message,
      help: error.help,
      stack: error.stack
    })
  }
}
