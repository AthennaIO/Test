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
 * Define the dataset for the test case. The test executor will be invoked
 * for all the items inside the dataset array.
 */
export function TestCase(value: any): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Annotation.defineDefaultMetadata(Target)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Target)
    const cases = tests.get(`${property}.with`, [])

    cases.push(value)

    tests.set(`${property}.with`, cases)
  }
}
