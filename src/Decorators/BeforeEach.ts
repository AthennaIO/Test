/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import 'reflect-metadata'

import { DecoratorHelper } from '#src/Helpers/DecoratorHelper'

/**
 * Create a new before each (setup.each) hook.
 */
export function BeforeEach(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    DecoratorHelper.defineDefaultMetadata(Target)

    const beforeEachHooks = Reflect.getMetadata('hooks:beforeEach', Target)

    beforeEachHooks.push({ method: property })

    Reflect.defineMetadata('hooks:beforeEach', beforeEachHooks, Target)
  }
}
