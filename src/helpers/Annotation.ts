/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ObjectBuilder } from '@athenna/common'

export class Annotation {
  /**
   * Define default metadata values in target.
   */
  public static defineDefaultMetadata(target: any): typeof Annotation {
    if (!Reflect.hasMetadata('tests', target)) {
      Reflect.defineMetadata(
        'tests',
        new ObjectBuilder({ referencedValues: true }),
        target
      )
    }

    if (!Reflect.hasMetadata('hooks:afterAll', target)) {
      Reflect.defineMetadata('hooks:afterAll', [], target)
    }

    if (!Reflect.hasMetadata('hooks:beforeAll', target)) {
      Reflect.defineMetadata('hooks:beforeAll', [], target)
    }

    if (!Reflect.hasMetadata('hooks:afterEach', target)) {
      Reflect.defineMetadata('hooks:afterEach', [], target)
    }

    if (!Reflect.hasMetadata('hooks:beforeEach', target)) {
      Reflect.defineMetadata('hooks:beforeEach', [], target)
    }

    return this
  }
}
