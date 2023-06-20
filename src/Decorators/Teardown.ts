/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'

import { Context } from '#src/types/Context'
import { ObjectBuilder } from '@athenna/common'
import { Decorator } from '#src/helpers/Decorator'
import { TeardownHandler } from '#src/types/TeardownHandler'

/**
 * Register a teardown hook from within the test.
 */
export function Teardown(handler: TeardownHandler<Context>): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Decorator.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.teardown`, handler)
  }
}
