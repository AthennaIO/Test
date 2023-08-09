/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseTest } from '#tests/stubs/BaseTest'
import { Test, AfterAll, AfterEach, BeforeAll, BeforeEach, type Context } from '#src'

export default class InheritanceTwoTest extends BaseTest {
  @AfterAll()
  public doSomethingAfterAllInheritanceTwoTest() {}

  @AfterEach()
  public doSomethingAfterEachInheritanceTwoTest() {}

  @BeforeAll()
  public doSomethingBeforeAllInheritanceTwoTest() {}

  @BeforeEach()
  public doSomethingBeforeEachInheritanceTwoTest() {}

  // The hooks above triggers makes the importer verify if the class has the method or not.

  @Test()
  public async shouldBeAbleToUseInheritanceInTestInheritanceTwoTestClass({ assert }: Context) {
    assert.equal(this.BEFORE_EACH_EXECUTED, true)
  }
}
