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
import { Annotation } from '#src/helpers/Annotation'

/**
 * Assign tags to the test. Later you can use the tags to run specific tests.
 */
export function Tags(tags: string[]): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Annotation.defineMeta(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)

    tests.set(`${property}.tags`, tags)
  }
}
