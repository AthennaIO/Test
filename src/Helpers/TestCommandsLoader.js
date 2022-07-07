import { join } from 'node:path'
import { Folder, Module } from '@secjs/utils'

export class TestCommandsLoader {
  /**
   * Return all commands from test package.
   *
   * @return {any[]}
   */
  static loadCommands() {
    return [import('#src/Commands/Test'), import('#src/Commands/Make/Test')]
  }

  /**
   * Return all custom templates from test package.
   *
   * @return {any[]}
   */
  static loadTemplates() {
    return new Folder(
      join(Module.createDirname(import.meta.url), '..', '..', 'templates'),
    ).loadSync().files
  }
}
