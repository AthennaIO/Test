/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BeforeEach } from '#src'

export class BaseTest {
  public BEFORE_EACH_EXECUTED = false

  @BeforeEach()
  public async beforeEach() {
    this.BEFORE_EACH_EXECUTED = true
  }
}
