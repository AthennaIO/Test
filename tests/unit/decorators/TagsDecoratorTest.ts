/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test, Test, Tags } from '#src'
import { ObjectBuilder } from '@athenna/common'

test.group('TagsAnnotationTest', () => {
  test('should be able to register tests of some class using test and tags annotation', async ({ assert }) => {
    class MyClass {
      @Test()
      @Tags(['users', 'customers'])
      public async shouldBeAbleToRun() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', MyClass)

    assert.equal(Object.keys(tests.get()).length, 1)
    assert.deepEqual(tests.get('shouldBeAbleToRun'), {
      title: 'shouldBeAbleToRun',
      tags: ['users', 'customers'],
    })
  })

  test('should be able to register the tags annotation without the test annotation', async ({ assert }) => {
    class MyClass {
      @Tags(['users', 'customers'])
      public async thisWillBeIgnored() {}
    }

    const tests = Reflect.getMetadata('tests', MyClass)

    assert.deepEqual(tests.get('thisWillBeIgnored'), {
      tags: ['users', 'customers'],
    })
  })

  test('should register hooks metadata default values if not defined', async ({ assert }) => {
    class MyClass {
      @Tags(['users', 'customers'])
      public async shouldBeAbleToRun() {}
    }

    assert.isTrue(Reflect.hasMetadata('tests', MyClass))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})
