/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ObjectBuilder } from '@athenna/common'
import { test, Test, Tags, resolveTagsForTest } from '#src'

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
      tags: ['users', 'customers']
    })
  })

  test('should be able to register the tags annotation without the test annotation', async ({ assert }) => {
    class MyClass {
      @Tags(['users', 'customers'])
      public async thisWillBeIgnored() {}
    }

    const tests = Reflect.getMetadata('tests', MyClass)

    assert.deepEqual(tests.get('thisWillBeIgnored'), {
      tags: ['users', 'customers']
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

  test('should register class-level tags metadata', async ({ assert }) => {
    @Tags(['unit'])
    class BaseUnitTest {}

    assert.deepEqual(Reflect.getMetadata('classTags', BaseUnitTest), ['unit'])
  })

  test('should inherit class-level tags for methods without method-level tags', async ({ assert }) => {
    @Tags(['unit'])
    class BaseUnitTest {}

    class MyTest extends BaseUnitTest {
      @Test()
      public async testOne() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', MyTest)

    assert.deepEqual(resolveTagsForTest(MyTest, tests.get('testOne')), ['unit'])
  })

  test('should use only method-level tags when the method declares @Tags()', async ({ assert }) => {
    @Tags(['unit'])
    class BaseUnitTest {}

    class MyTest extends BaseUnitTest {
      @Test()
      public async testOne() {}

      @Test()
      @Tags(['two'])
      public async testTwo() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', MyTest)

    assert.deepEqual(resolveTagsForTest(MyTest, tests.get('testOne')), ['unit'])
    assert.deepEqual(resolveTagsForTest(MyTest, tests.get('testTwo')), ['two'])
  })

  test('should merge class tags from base to subclass in order', async ({ assert }) => {
    @Tags(['unit'])
    class Base {}

    @Tags(['integration'])
    class Child extends Base {
      @Test()
      public async example() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', Child)

    assert.deepEqual(resolveTagsForTest(Child, tests.get('example')), ['unit', 'integration'])
  })
})
