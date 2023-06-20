/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'

import { Decorator } from '#src/helpers/Decorator'

/**
 * Create a new after each (teardown.each) hook.
 */
export function AfterEach(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Decorator.defineDefaultMetadata(Target)

    const afterEachHooks = Reflect.getMetadata('hooks:afterEach', Target)

    afterEachHooks.push({ method: property })

    Reflect.defineMetadata('hooks:afterEach', afterEachHooks, Target)
  }
}
