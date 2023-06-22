/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Context } from '#src/types'
import { BaseTest } from '#tests/stubs/BaseTest'
import { AfterAll, AfterEach, BeforeAll, BeforeEach, Test } from '#src'

export default class InheritanceOneTest extends BaseTest {
  @AfterAll()
  public doSomethingAfterAllInheritanceOneTest() {}

  @AfterEach()
  public doSomethingAfterEachInheritanceOneTest() {}

  @BeforeAll()
  public doSomethingBeforeAllInheritanceOneTest() {}

  @BeforeEach()
  public doSomethingBeforeEachInheritanceOneTest() {}

  // The hooks above triggers makes the importer verify if the class has the method or not.

  @Test()
  public async shouldBeAbleToUseInheritanceInTestInheritanceOneTestClass({ assert }: Context) {
    assert.equal(this.BEFORE_EACH_EXECUTED, true)
  }
}
