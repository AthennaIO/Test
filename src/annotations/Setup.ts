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
import { Annotation } from '#src/helpers/Annotation'

/**
 * Register a setup hook from within the test.
 */
export function Setup(handler: SetupHandler<Context>): MethodAnnotation {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Annotation.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.setup`, handler)
  }
}
