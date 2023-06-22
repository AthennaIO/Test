/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { assert, Assert } from '@japa/assert'
import { specReporter } from '@japa/spec-reporter'
import { runFailedTests } from '@japa/run-failed-tests'
import { run, test, configure, processCliArgs } from '@japa/runner'

export {
  Assert,
  run,
  test,
  assert,
  configure,
  processCliArgs,
  specReporter,
  runFailedTests,
}

export * from '#src/globals/Assert'
export * from '#src/globals/Context'

export * from '#src/helpers/Runner'
export * from '#src/helpers/Importer'
export * from '#src/helpers/ExitFaker'
export * from '#src/decorators/AfterAll'
export * from '#src/decorators/AfterEach'
export * from '#src/decorators/BeforeAll'
export * from '#src/decorators/BeforeEach'
export * from '#src/decorators/Cleanup'
export * from '#src/decorators/DisableTimeout'
export * from '#src/decorators/Fails'
export * from '#src/decorators/Pin'
export * from '#src/decorators/Retry'
export * from '#src/decorators/Setup'
export * from '#src/decorators/Skip'
export * from '#src/decorators/Tags'
export * from '#src/decorators/Teardown'
export * from '#src/decorators/Test'
export * from '#src/decorators/TestCase'
export * from '#src/decorators/Timeout'
export * from '#src/decorators/WaitForDone'
