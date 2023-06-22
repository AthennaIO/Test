/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'

import type { Context, SetupHandler } from '#src/types'
import { ObjectBuilder } from '@athenna/common'
import { Decorator } from '#src/helpers/Decorator'

/**
 * Register a setup hook from within the test.
 */
export function Setup(handler: SetupHandler<Context>): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Decorator.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.setup`, handler)
  }
}
