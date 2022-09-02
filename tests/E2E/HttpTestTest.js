import { Test } from '#src/index'
import { Artisan } from '@athenna/artisan'
import { File, Path, Folder } from '@secjs/utils'

export class HttpTestTest extends Test {
  async afterAll() {
    await Folder.safeRemove(Path.app())
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.routes())
    await Folder.safeRemove(Path.providers())
    await File.safeRemove(Path.pwd('.env.test'))
  }

  /**
   * Run your test.
   *
   * @param {import('#src/index').HttpTestContext} ctx
   */
  async shouldBeAbleToExecuteInternalHttpRequestsInTests({ request }) {
    const response = await request.get('/healthcheck')

    response.assertStatusCode(200)
    response.assertBodyDeepEqual({ status: 'ok' })
    response.assertHeaderContains({
      'access-control-expose-headers': '*',
      'x-ratelimit-limit': 1000,
      'x-ratelimit-remaining': 999,
      'x-ratelimit-reset': 60,
    })
  }

  /**
   * Run your test.
   *
   * @param {import('#src/index').HttpTestContext} ctx
   */
  async shouldBeAbleToMakeTestFiles({ assert }) {
    await Artisan.call('make:test FeatureTest')

    const path = Path.tests('E2E/FeatureTest.js')

    assert.isTrue(await File.exists(path))

    await File.safeRemove(path)
  }

  /**
   * Run your test.
   *
   * @param {import('#src/index').HttpTestContext} ctx
   */
  async shouldBeAbleToMakeFnTestFiles({ assert }) {
    await Artisan.call('make:test FeatureTestFn --no-class')

    const path = Path.tests('E2E/FeatureTestFn.js')

    assert.isTrue(await File.exists(path))

    await File.safeRemove(path)
  }
}
