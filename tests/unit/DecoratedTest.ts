/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  TestCase,
  Test,
  Context,
  Fails,
  WaitForDone,
  DisableTimeout,
  Timeout,
  Tags,
  Retry,
  Skip,
  Setup,
  BeforeAll,
  BeforeEach,
} from '#src'

let SETUP_EXECUTED = false
let BEFORE_ALL_EXECUTED = false
let BEFORE_EACH_EXECUTED = false

function setup() {
  SETUP_EXECUTED = true
}

export default class DecoratedTest {
  @BeforeAll()
  public async beforeAll() {
    BEFORE_ALL_EXECUTED = true
  }

  @BeforeEach()
  public async beforeEach() {
    BEFORE_EACH_EXECUTED = true
  }

  @Test()
  @Fails()
  public async shouldBeAbleToAssertSomeTestFails() {
    throw new Error('some error')
  }

  @Test()
  @WaitForDone()
  public async shouldBeAbleToWaitForDoneCallInsideTheTest(_, done) {
    done()
  }

  @Test()
  @DisableTimeout()
  public async shouldBeAbleToDisableTheTestTimeout({ test, assert }: Context) {
    assert.equal(test.options.timeout, 0)
  }

  @Test()
  @Timeout(1335)
  public async shouldBeAbleToSetAnyTestTimeout({ test, assert }: Context) {
    assert.equal(test.options.timeout, 1335)
  }

  @Test()
  @Tags(['users', 'customers'])
  public async shouldBeAbleToSetTestTags({ test, assert }: Context) {
    assert.deepEqual(test.options.tags, ['users', 'customers'])
  }

  @Test()
  @TestCase('lenon@athenna.io')
  @TestCase('txsoura@athenna.io')
  public async shouldBeAbleToRunTestCases({ test, assert }: Context, value: any) {
    assert.isTrue(value.includes('@athenna.io'))
    assert.deepEqual(test.dataset, ['txsoura@athenna.io', 'lenon@athenna.io'])
  }

  @Test()
  @Retry(2)
  public async shouldBeAbleToSetTestRetry({ test, assert }: Context) {
    assert.deepEqual(test.options.retries, 2)
  }

  @Test()
  @Setup(setup)
  public async shouldBeAbleToSetTestSetup({ assert }: Context) {
    assert.isTrue(SETUP_EXECUTED)
  }

  @Test()
  @Skip()
  public async shouldBeAbleToSkipTest() {
    throw new Error('will not throw because test is skipped')
  }

  @Test()
  @Skip('Under development')
  public async shouldBeAbleToSkipTestWithReason() {
    throw new Error('will not throw because test is skipped')
  }

  @Test()
  public async shouldHaveExecutedBeforeAllMethod({ assert }: Context) {
    assert.isTrue(BEFORE_ALL_EXECUTED)
  }

  @Test()
  public async shouldHaveExecutedBeforeEachMethod({ assert }: Context) {
    assert.isTrue(BEFORE_EACH_EXECUTED)
  }
}
