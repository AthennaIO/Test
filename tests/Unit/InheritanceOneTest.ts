/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, TestContext } from '#src'
import { BaseTest } from '#tests/Stubs/BaseTest'

export default class InheritanceOneTest extends BaseTest {
  @Test()
  public async shouldBeAbleToUseInheritanceInTestInheritanceOneTestClass({ assert }: TestContext) {
    assert.equal(this.BEFORE_EACH_EXECUTED, true)
  }
}
