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
 * Create a new before all (setup) hook.
 */
export function BeforeAll(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Decorator.defineDefaultMetadata(Target)

    const beforeAllHooks = Reflect.getMetadata('hooks:beforeAll', Target)

    beforeAllHooks.push({ method: property })

    Reflect.defineMetadata('hooks:beforeAll', beforeAllHooks, Target)
  }
}
