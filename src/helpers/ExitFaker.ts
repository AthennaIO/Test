/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { SinonSpy } from 'sinon'
import { fake } from 'sinon'

export class ExitFaker {
  public static original = process.exit
  public static faker: SinonSpy<[code?: number], never>

  /**
   * Fake the process.exit method.
   */
  public static fake(): typeof ExitFaker {
    this.faker = fake() as SinonSpy<[code?: number], never>
    process.exit = this.faker

    return this
  }

  /**
   * Release the faker process.exit method.
   */
  public static release(): typeof ExitFaker {
    this.faker = undefined
    process.exit = this.original

    return this
  }
}
