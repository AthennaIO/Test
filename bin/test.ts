/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Runner } from '#src'

await Runner.setTsEnv()
  .addAssertPlugin()
  .addExpectTypeOfPlugin()
  .addPath('tests/unit/**/*Test.ts')
  .setCliArgs(process.argv.slice(2))
  .setGlobalTimeout(10000)
  .run()
