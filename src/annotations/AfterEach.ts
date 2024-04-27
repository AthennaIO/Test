/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'

import { Annotation } from '#src/helpers/Annotation'

/**
 * Create a new after each (teardown.each) hook.
 */
export function AfterEach(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Annotation.defineMeta(Target)

    const afterEachHooks = Reflect.getMetadata('hooks:afterEach', Target)

    if (!afterEachHooks.includes(property)) {
      afterEachHooks.push(property)
    }

    Reflect.defineMetadata('hooks:afterEach', afterEachHooks, Target)
  }
}
