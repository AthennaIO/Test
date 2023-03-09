/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'
import { TestHooksHandler } from '@japa/core'
import { ObjectBuilder } from '@athenna/common'
import { TestContext } from '#src/Types/TestContext'
import { DecoratorHelper } from '#src/Helpers/DecoratorHelper'

/**
 * Register a setup hook from within the test.
 */
export function Setup(handler: TestHooksHandler<TestContext>): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    DecoratorHelper.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.setup`, handler)
  }
}
