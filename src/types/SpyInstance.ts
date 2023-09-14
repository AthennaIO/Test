/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { SpyMethod } from '#src'

export type SpyInstance<T> = {
  [P in keyof T]: SpyMethod<T[P]>
}
