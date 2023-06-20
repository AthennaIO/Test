/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test, AfterAll } from '#src'
import { ObjectBuilder } from '@athenna/common'

test.group('AfterAllDecoratorTest', () => {
  test('should be able to register after all hook of some class using after all decorator', async ({ assert }) => {
    class MyClass {
      @AfterAll()
      public async afterAll() {}
    }

    const afterAllHooks = Reflect.getMetadata('hooks:afterAll', MyClass)

    assert.deepEqual(afterAllHooks, [{ method: 'afterAll' }])
  })

  test('should register tests and hooks metadata default array value if not defined', async ({ assert }) => {
    class MyClass {
      @AfterAll()
      public async afterAll() {}
    }

    assert.isTrue(Reflect.hasMetadata('hooks:afterAll', MyClass))
    assert.deepEqual(Reflect.getMetadata('tests', MyClass), new ObjectBuilder({ referencedValues: true }))
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})
