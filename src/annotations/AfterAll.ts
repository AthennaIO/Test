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
 * Create a new after all (teardown) hook.
 */
export function AfterAll(): MethodAnnotation {
  return (target: any, property: string, _: any) => {
    const Target = target.constructor

    Annotation.defineDefaultMetadata(Target)

    const afterAllHooks = Reflect.getMetadata('hooks:afterAll', Target)

    afterAllHooks.push({ method: property })

    Reflect.defineMetadata('hooks:afterAll', afterAllHooks, Target)
  }
}
