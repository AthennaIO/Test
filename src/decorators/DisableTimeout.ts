/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'

import { ObjectBuilder } from '@athenna/common'
import { Decorator } from '#src/helpers/Decorator'

/**
 * Disable test timeout. It is the same as calling `test.timeout(0)`
 */
export function DisableTimeout(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Decorator.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.disableTimeout`, true)
  }
}
