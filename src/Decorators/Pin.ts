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
 * Pin the test. If one test is pinned, Japa will run only pinned tests.
 */
export function Pin(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    DecoratorHelper.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.pin`, true)
  }
}
