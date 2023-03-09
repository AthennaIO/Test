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
import { DecoratorHelper } from '#src/Helpers/DecoratorHelper'

/**
 * Wait for the test executor to call done method.
 */
export function WaitForDone(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    DecoratorHelper.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.waitForDone`, true)
  }
}
