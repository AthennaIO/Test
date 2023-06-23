/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test, Test, Teardown } from '#src'
import { ObjectBuilder } from '@athenna/common'

function teardown() {}

test.group('TeardownAnnotationTest', () => {
  test('should be able to register tests of some class using test and teardown annotation', async ({ assert }) => {
    class MyClass {
      @Test()
      @Teardown(teardown)
      public async shouldBeAbleToRun() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', MyClass)

    assert.equal(Object.keys(tests.get()).length, 1)
    assert.deepEqual(tests.get('shouldBeAbleToRun'), {
      title: 'shouldBeAbleToRun',
      teardown,
    })
  })

  test('should be able to register the teardown annotation without the test annotation', async ({ assert }) => {
    class MyClass {
      @Teardown(teardown)
      public async thisWillBeIgnored() {}
    }

    const tests = Reflect.getMetadata('tests', MyClass)

    assert.deepEqual(tests.get('thisWillBeIgnored'), {
      teardown,
    })
  })

  test('should register hooks metadata default values if not defined', async ({ assert }) => {
    class MyClass {
      @Teardown(teardown)
      public async shouldBeAbleToRun() {}
    }

    assert.isTrue(Reflect.hasMetadata('tests', MyClass))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})
