/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { FakeMethod } from '#src/types'

export interface FakeTimerInstallOpts {
  /**
   * Installs fake timers with the specified unix epoch (default: 0)
   */
  now?: number | Date | undefined

  /**
   * An array with names of global methods and APIs to fake. By default, `@sinonjs/fake-timers` does not replace `nextTick()` and `queueMicrotask()`.
   * For instance, `FakeTimers.install({ toFake: ['setTimeout', 'nextTick'] })` will fake only `setTimeout()` and `nextTick()`
   */
  toFake?: FakeMethod[] | undefined

  /**
   * The maximum number of timers that will be run when calling runAll() (default: 1000)
   */
  loopLimit?: number | undefined

  /**
   * Tells @sinonjs/fake-timers to increment mocked time automatically based on the real system time shift (e.g. the mocked time will be incremented by
   * 20ms for every 20ms change in the real system time) (default: false)
   */
  shouldAdvanceTime?: boolean | undefined

  /**
   * Relevant only when using with shouldAdvanceTime: true. increment mocked time by advanceTimeDelta ms every advanceTimeDelta ms change
   * in the real system time (default: 20)
   */
  advanceTimeDelta?: number | undefined

  /**
   * Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their respective handlers. These are not cleared by
   * default, leading to potentially unexpected behavior if timers existed prior to installing FakeTimers. (default: false)
   */
  shouldClearNativeTimers?: boolean | undefined
}
