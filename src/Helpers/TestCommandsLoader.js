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
    const dirname = Module.createDirname(import.meta.url)
    const templatesPath = join(dirname, '..', '..', 'templates')

    return new Folder(templatesPath).loadSync().getFilesByPattern('**/*.ejs')
  }
}
