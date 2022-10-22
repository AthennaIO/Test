/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Assert } from '@japa/assert'
import { Server } from '@athenna/http'
import { TestResponse } from '#src/Http/TestResponse'

export class TestRequest {
  /**
   * @type {import('@japa/assert').Assert}
   */
  #assert = new Assert()

  /**
   * Instantiate TestResponse class from API response.
   *
   * @param {any} response
   */
  #createResponse(response) {
    return new TestResponse(this.#assert, response)
  }

  /**
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  get(url, options = {}) {
    return Server.request({ url, method: 'GET', ...options }).then(res =>
      this.#createResponse(res),
    )
  }

  /**
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  head(url, options = {}) {
    return Server.request({ url, method: 'HEAD', ...options }).then(res =>
      this.#createResponse(res),
    )
  }

  /**
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  options(url, options = {}) {
    return Server.request({ url, method: 'OPTIONS', ...options }).then(res =>
      this.#createResponse(res),
    )
  }

  /**
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  post(url, options = {}) {
    return Server.request({ url, method: 'POST', ...options }).then(res =>
      this.#createResponse(res),
    )
  }

  /**
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  put(url, options = {}) {
    return Server.request({ url, method: 'PUT', ...options }).then(res =>
      this.#createResponse(res),
    )
  }

  /**
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  patch(url, options = {}) {
    return Server.request({ url, method: 'PATCH', ...options }).then(res =>
      this.#createResponse(res),
    )
  }

  /**
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  delete(url, options = {}) {
    return Server.request({ url, method: 'DELETE', ...options }).then(res =>
      this.#createResponse(res),
    )
  }
}
