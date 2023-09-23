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
 * Create a new before all (setup) hook.
 */
export function BeforeAll(): MethodDecorator {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Annotation.defineMeta(Target)

    const beforeAllHooks = Reflect.getMetadata('hooks:beforeAll', Target)

    beforeAllHooks.push({ method: property })

    Reflect.defineMetadata('hooks:beforeAll', beforeAllHooks, Target)
  }
}
