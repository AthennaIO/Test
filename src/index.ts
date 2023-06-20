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
import {
  type Config,
  type PluginFn,
  run,
  test,
  configure,
  processCliArgs,
} from '@japa/runner'

export {
  Assert,
  Config,
  PluginFn,
  run,
  test,
  assert,
  configure,
  processCliArgs,
  specReporter,
  runFailedTests,
}

export * from './globals/Assert.js'
export * from './globals/Context.js'

export * from './helpers/Runner.js'
export * from './helpers/Importer.js'
export * from './helpers/ExitFaker.js'
export * from './decorators/AfterAll.js'
export * from './decorators/AfterEach.js'
export * from './decorators/BeforeAll.js'
export * from './decorators/BeforeEach.js'
export * from './decorators/Cleanup.js'
export * from './decorators/DisableTimeout.js'
export * from './decorators/Fails.js'
export * from './decorators/Pin.js'
export * from './decorators/Retry.js'
export * from './decorators/Setup.js'
export * from './decorators/Skip.js'
export * from './decorators/Tags.js'
export * from './decorators/Teardown.js'
export * from './decorators/Test.js'
export * from './decorators/TestCase.js'
export * from './decorators/Timeout.js'
export * from './decorators/WaitForDone.js'
export * from './types/Options.js'
export * from './types/Context.js'
export * from './types/SetupHandler.js'
export * from './types/CleanupHandler.js'
export * from './types/TeardownHandler.js'
