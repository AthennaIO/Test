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

    const hook = Color.green.bold('@BeforeEach')
    const classMethod = Color.yellow.bold(`${className}.${method}`)

    if (error.message) {
      error.message = `An exception has occurred while running the ${hook} hook in ${classMethod} method:\n\n${error.message}`
    } else {
      error.message = `An exception has occurred while running the ${hook} hook in ${classMethod} method.`
    }

    super({
      code: 'E_BEFORE_EACH_HOOK',
      details: error.details,
      message: error.message,
      help: error.help,
      stack: error.stack
    })
  }
}
