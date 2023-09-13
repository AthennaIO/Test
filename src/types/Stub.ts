/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { SinonStub } from 'sinon'

export type Stub<
  TArgs extends readonly any[] = any[],
  TReturnValue = any
> = SinonStub<TArgs, TReturnValue>
