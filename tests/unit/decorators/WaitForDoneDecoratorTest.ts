/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test, Test, WaitForDone } from '#src'
import { ObjectBuilder } from '@athenna/common'

test.group('WaitForDoneAnnotationTest', () => {
  test('should be able to register tests of some class using test and waitForDone annotation', async ({ assert }) => {
    class MyClass {
      @Test()
      @WaitForDone()
      public async shouldBeAbleToRun() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', MyClass)

    assert.equal(Object.keys(tests.get()).length, 1)
    assert.deepEqual(tests.get('shouldBeAbleToRun'), {
      title: 'shouldBeAbleToRun',
      waitForDone: true
    })
  })

  test('should be able to register the waitForDone annotation without the test annotation', async ({ assert }) => {
    class MyClass {
      @WaitForDone()
      public async thisWillBeIgnored() {}
    }

    const tests = Reflect.getMetadata('tests', MyClass)

    assert.deepEqual(tests.get('thisWillBeIgnored'), {
      waitForDone: true
    })
  })

  test('should register hooks metadata default values if not defined', async ({ assert }) => {
    class MyClass {
      @WaitForDone()
      public async shouldBeAbleToRun() {}
    }

    assert.isTrue(Reflect.hasMetadata('tests', MyClass))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})
