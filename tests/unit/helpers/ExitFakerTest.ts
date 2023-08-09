/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, ExitFaker, type Context } from '#src'

export default class ExitFakerTest {
  @Test()
  public async shouldBeAbleToFakeTheProcessExitMethod({ assert }: Context) {
    ExitFaker.fake()

    process.exit(1)

    assert.isTrue(ExitFaker.faker.calledWith(1))
  }

  @Test()
  public async shouldBeAbleToRealeaseTheFakedProcessExitMethodToReturnToTheOriginalState({ assert }: Context) {
    ExitFaker.fake()

    process.exit(1)

    assert.isTrue(ExitFaker.faker.calledWith(1))

    ExitFaker.release()
  }
}
