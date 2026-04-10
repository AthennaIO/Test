/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Context } from '#src'
import type {
  TestHooksHandler,
  TestHooksCleanupHandler
} from '@japa/runner/types'

export interface TestOptions {
  title?: string
  pin?: boolean
  fails?: boolean
  timeout?: number
  disableTimeout?: boolean
  tags?: string[]
  skip?: string | boolean
  retry?: number
  with?: any[]
  waitForDone?: boolean
  setup?: TestHooksHandler<Context>
  teardown?: TestHooksHandler<Context>
  cleanup?: TestHooksCleanupHandler<Context>
}
