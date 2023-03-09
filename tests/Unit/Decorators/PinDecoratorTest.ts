/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, Pin } from '#src'
import { test } from '@japa/runner'
import { ObjectBuilder } from '@athenna/common'

test.group('PinDecoratorTest', () => {
  test('should be able to register tests of some class using test and pin decorator', async ({ assert }) => {
    class MyClass {
      @Test()
      @Pin()
      public async shouldBeAbleToRun() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', MyClass)

    assert.equal(Object.keys(tests.get()).length, 1)
    assert.deepEqual(tests.get('shouldBeAbleToRun'), {
      title: 'shouldBeAbleToRun',
      pin: true,
    })
  })

  test('should be able to register the pin decorator without the test decorator', async ({ assert }) => {
    class MyClass {
      @Pin()
      public async thisWillBeIgnored() {}
    }

    const tests = Reflect.getMetadata('tests', MyClass)

    assert.deepEqual(tests.get('thisWillBeIgnored'), {
      pin: true,
    })
  })

  test('should register hooks metadata default values if not defined', async ({ assert }) => {
    class MyClass {
      @Pin()
      public async shouldBeAbleToRun() {}
    }

    assert.isTrue(Reflect.hasMetadata('tests', MyClass))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})
