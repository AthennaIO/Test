/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Config, PluginFn } from '#src/types'
import { run, configure, processCliArgs, Importer } from '#src'

export class Runner {
  public static files: string[] = []

  public static plugins: PluginFn[] = []
  public static reporters: any[] = []

  public static forceExit = false
  public static globalTimeout = 10000
  public static cliArgs = process.argv.slice(2)

  public static otherConfigs: Partial<Config> = {}

  /**
   * Add a new path from where import tests.
   *
   * @example ```ts
   * Runner.addPath('tests/unit/*Test.ts')
   * ```
   */
  public static addPath(path: string): typeof Runner {
    this.files.push(path)

    return this
  }

  /**
   * Add a new plugin.
   *
   * @example ```ts
   * import { assert } from '@athenna/test'
   *
   * Runner.addPlugin(assert())
   * ```
   */
  public static addPlugin(plugin: PluginFn): typeof Runner {
    this.plugins.push(plugin)

    return this
  }

  /**
   * Add a new reporter.
   *
   * @example ```ts
   * import { specReporter } from '@athenna/test'
   *
   * Runner.addReporter(specReporter())
   * ```
   */
  public static addReporter(reporter: any): typeof Runner {
    this.reporters.push(reporter)

    return this
  }

  /**
   * Set the global timeout of all tests.
   *
   * @example ```ts
   * Runner.setGlobalTimeout(10000) <- 10 seconds
   * ```
   */
  public static setGlobalTimeout(timeout: number): typeof Runner {
    this.globalTimeout = timeout

    return this
  }

  /**
   * Set that tests should be forced to exit.
   * Useful when testing with database connections.
   *
   * @example ```ts
   * Runner.setForceExit()
   * ```
   */
  public static setForceExit(): typeof Runner {
    this.forceExit = true

    return this
  }

  /**
   * Set the cli arguments to be parsed to configs.
   *
   * @example ```ts
   * Runner.setCliArgs(process.argv.slice(3))
   * ```
   */
  public static setCliArgs(cliArgs: string[]): typeof Runner {
    this.cliArgs = cliArgs

    return this
  }

  /**
   * Set custom configurations to be merged with
   * the already defined.
   *
   * @example ```ts
   * Runner.setConfigs({ filters: { groups: ['MyTestClass'] }})
   * ```
   */
  public static setConfigs(configs: Partial<Config>): typeof Runner {
    this.otherConfigs = configs

    return this
  }

  /**
   * Set the `IS_TS` env as `true`.
   *
   * @example ```ts
   * Runner.setTsEnv()
   * ```
   */
  public static setTsEnv(): typeof Runner {
    process.env.IS_TS = 'true'

    return this
  }

  /**
   * Parse all your configurations and run the tests.
   *
   * @example ```ts
   * await Runner.run()
   * ```
   */
  public static async run(): Promise<void> {
    configure({
      importer: Importer.import,
      files: this.files,
      plugins: this.plugins,
      reporters: this.reporters,
      forceExit: this.forceExit,
      timeout: this.globalTimeout,
      ...processCliArgs(this.cliArgs),
    })

    return run()
  }
}
