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
import type { TestOptions } from '#src/types/TestOptions'

const CLASS_TAGS_KEY = 'classTags'

function collectInheritedClassTags(Ctor: any): string[] {
  const constructors: any[] = []
  let current: any = Ctor

  while (current && current !== Function.prototype) {
    constructors.unshift(current)
    current = Object.getPrototypeOf(current)
  }

  const tags: string[] = []

  for (const ctor of constructors) {
    const ownTags = Reflect.getOwnMetadata(CLASS_TAGS_KEY, ctor)

    if (ownTags?.length) {
      tags.push(...ownTags)
    }
  }

  return tags
}

/**
 * Effective tags for a test method: method-level `@Tags()` replaces class-level
 * tags entirely; otherwise tags from the class hierarchy apply (base first,
 * then subclasses).
 */
export function resolveTagsForTest(TestClass: any, options: TestOptions) {
  if (options.tags !== undefined) {
    return options.tags
  }

  const inherited = collectInheritedClassTags(TestClass)

  return inherited.length ? inherited : undefined
}

/**
 * Assign tags to the test class or a single test method. Class-level tags apply
 * to every `@Test()` method that does not declare its own `@Tags()`. Method-level
 * `@Tags()` replaces inherited class tags for that method only.
 */
export function Tags(tags: string[]): ClassDecorator & MethodDecorator {
  return function (
    target: any,
    propertyKey?: string | symbol,
    _descriptor?: PropertyDescriptor
  ) {
    if (propertyKey === undefined) {
      Annotation.defineMeta(target)
      Reflect.defineMetadata(CLASS_TAGS_KEY, tags, target)

      return
    }

    const Constructor = target.constructor

    Annotation.defineMeta(Constructor)

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Constructor)

    tests.set(`${String(propertyKey)}.tags`, tags)
  } as ClassDecorator & MethodDecorator
}
