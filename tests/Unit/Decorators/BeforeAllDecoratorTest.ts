/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BeforeAll } from '#src'
import { test } from '@japa/runner'
import { ObjectBuilder } from '@athenna/common'

test.group('BeforeAllDecoratorTest', () => {
  test('should be able to register before all hook of some class using before all decorator', async ({ assert }) => {
    class MyClass {
      @BeforeAll()
      public async beforeAll() {}
    }

    const beforeAllHooks = Reflect.getMetadata('hooks:beforeAll', MyClass)

    assert.deepEqual(beforeAllHooks, [{ method: 'beforeAll' }])
  })

  test('should register tests and hooks metadata default array value if not defined', async ({ assert }) => {
    class MyClass {
      @BeforeAll()
      public async beforeAll() {}
    }

    assert.isTrue(Reflect.hasMetadata('hooks:beforeAll', MyClass))
    assert.deepEqual(Reflect.getMetadata('tests', MyClass), new ObjectBuilder({ referencedValues: true }))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})