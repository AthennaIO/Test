/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, ExitFaker, TestContext } from '#src'

export default class ExitFakerTest {
  @Test()
  public async shouldBeAbleToFakeTheProcessExitMethod({ assert }: TestContext) {
    ExitFaker.fake()

    process.exit(1)

    assert.isTrue(ExitFaker.faker.calledWith(1))
  }

  @Test()
  public async shouldBeAbleToRealeaseTheFakedProcessExitMethodToReturnToTheOriginalState({ assert }: TestContext) {
    ExitFaker.fake()

    process.exit(1)

    assert.isTrue(ExitFaker.faker.calledWith(1))

    ExitFaker.release()
  }
}
