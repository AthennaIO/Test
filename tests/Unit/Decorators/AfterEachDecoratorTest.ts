/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test, AfterEach } from '#src'
import { ObjectBuilder } from '@athenna/common'

test.group('AfterEachDecoratorTest', () => {
  test('should be able to register after each hook of some class using after each decorator', async ({ assert }) => {
    class MyClass {
      @AfterEach()
      public async afterEach() {}
    }

    const afterEachHooks = Reflect.getMetadata('hooks:afterEach', MyClass)

    assert.deepEqual(afterEachHooks, [{ method: 'afterEach' }])
  })

  test('should register tests and hooks metadata default array value if not defined', async ({ assert }) => {
    class MyClass {
      @AfterEach()
      public async afterEach() {}
    }

    assert.isTrue(Reflect.hasMetadata('hooks:afterEach', MyClass))
    assert.deepEqual(Reflect.getMetadata('tests', MyClass), new ObjectBuilder({ referencedValues: true }))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})
