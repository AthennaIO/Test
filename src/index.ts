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

export * from './types/index.js'

export * from '#src/globals/Assert'
export * from '#src/globals/Context'

export * from '#src/helpers/Runner'
export * from '#src/helpers/Importer'
export * from '#src/helpers/ExitFaker'
export * from '#src/annotations/AfterAll'
export * from '#src/annotations/AfterEach'
export * from '#src/annotations/BeforeAll'
export * from '#src/annotations/BeforeEach'
export * from '#src/annotations/Cleanup'
export * from '#src/annotations/DisableTimeout'
export * from '#src/annotations/Fails'
export * from '#src/annotations/Pin'
export * from '#src/annotations/Retry'
export * from '#src/annotations/Setup'
export * from '#src/annotations/Skip'
export * from '#src/annotations/Tags'
export * from '#src/annotations/Teardown'
export * from '#src/annotations/Test'
export * from '#src/annotations/TestCase'
export * from '#src/annotations/Timeout'
export * from '#src/annotations/WaitForDone'
