/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test, Test, TestCase } from '#src'
import { ObjectBuilder } from '@athenna/common'

test.group('TestCaseDecoratorTest', () => {
  test('should be able to register tests of some class using test and test case decorator', async ({ assert }) => {
    class MyClass {
      @Test()
      @TestCase('lenon@athenna.io')
      public async shouldBeAbleToRun() {}
    }

    const tests: ObjectBuilder = Reflect.getMetadata('tests', MyClass)

    assert.equal(Object.keys(tests.get()).length, 1)
    assert.deepEqual(tests.get('shouldBeAbleToRun'), {
      title: 'shouldBeAbleToRun',
      with: ['lenon@athenna.io'],
    })
  })

  test('should be able to register the test case decorator without the test decorator', async ({ assert }) => {
    class MyClass {
      @TestCase('lenon@athenna.io')
      public async thisWillBeIgnored() {}
    }

    const tests = Reflect.getMetadata('tests', MyClass)

    assert.deepEqual(tests.get('thisWillBeIgnored'), {
      with: ['lenon@athenna.io'],
    })
  })

  test('should be able to register multiples test cases', async ({ assert }) => {
    class MyClass {
      @TestCase('lenon@athenna.io')
      @TestCase('txsoura@athenna.io')
      @TestCase(['lenon@athenna.io', 'txsoura@athenna.io'])
      public async thisWillBeIgnored() {}
    }

    const tests = Reflect.getMetadata('tests', MyClass)

    assert.deepEqual(tests.get('thisWillBeIgnored'), {
      with: [['lenon@athenna.io', 'txsoura@athenna.io'], 'txsoura@athenna.io', 'lenon@athenna.io'],
    })
  })

  test('should register hooks metadata default values if not defined', async ({ assert }) => {
    class MyClass {
      @TestCase('lenon@athenna.io')
      public async shouldBeAbleToRun() {}
    }

    assert.isTrue(Reflect.hasMetadata('tests', MyClass))
    assert.deepEqual(Reflect.getMetadata('hooks:afterAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeAll', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:afterEach', MyClass), [])
    assert.deepEqual(Reflect.getMetadata('hooks:beforeEach', MyClass), [])
  })
})
