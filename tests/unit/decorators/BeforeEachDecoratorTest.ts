/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test, BeforeEach } from '#src'
import { ObjectBuilder } from '@athenna/common'

test.group('BeforeEachAnnotationTest', () => {
  test('should be able to register before each hook of some class using before each annotation', async ({ assert }) => {
    class MyClass {
      @BeforeEach()
      public async beforeEach() {}
    }

    const beforeEachHooks = Reflect.getMetadata('hooks:beforeEach', MyClass)

    assert.deepEqual(beforeEachHooks, ['beforeEach'])
  })

  test('should register tests and hooks metadata default array value if not defined', async ({ assert }) => {
    class MyClass {
      @BeforeEach()
      public async beforeEach() {}
    }

    assert.isTrue(Reflect.hasMetadata('hooks:beforeEach', MyClass))
    assert.deepEqual(Reflect.getMetadata('tests', MyClass), new ObjectBuilder({ referencedValues: true }))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
  })
})
