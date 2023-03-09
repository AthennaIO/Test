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
import { TestContext } from '#src/Types/TestContext'
import { TestHooksCleanupHandler } from '@japa/core'
import { DecoratorHelper } from '#src/Helpers/DecoratorHelper'

/**
 * Register a cleanup hook from within the test.
 */
export function Cleanup(
  handler: TestHooksCleanupHandler<TestContext>,
): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    DecoratorHelper.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.cleanup`, handler)
  }
}
