/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Context } from '#src/types/Context'
import { TestHooksHandler, TestHooksCleanupHandler } from '@japa/core'

export interface Options {
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
