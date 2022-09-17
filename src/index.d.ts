export * from '@japa/runner'
import { Assert } from '@japa/assert'
import { InjectOptions } from 'fastify'

declare module '@japa/runner' {
  interface TestContext {
    request: TestRequest
  }
}

export interface UnitTestContext {
  assert: Assert
}

export interface HttpTestContext {
  assert: Assert
  request: TestRequest
}

export class Test {
  /**
   * Before all event. This method is executed
   * before all tests.
   *
   * @return {void | Promise<void>}
   */
  beforeAll(): void | Promise<void>

  /**
   * Before each event. This method is executed
   * before each test.
   *
   * @return {void | Promise<void>}
   */
  beforeEach(): void | Promise<void>

  /**
   * After all event. This method is executed
   * after all tests.
   *
   * @return {void | Promise<void>}
   */
  afterAll(): void | Promise<void>

  /**
   * After each event. This method is executed
   * after each test.
   *
   * @return {void | Promise<void>}
   */
  afterEach(): void | Promise<void>

  /**
   * Set the test timeout for all tests inside the group.
   *
   * @example
   *  Default is 2000
   *
   * @return {number}
   */
  get timeout(): number

  /**
   * Set the test names that can run.
   *
   * @example
   *  Default is ['*']
   *
   * @return {string[]}
   */
  get runOnly(): string[]

  /**
   * Get all test methods that doesn't start with _, ignoring constructor
   * and test events.
   *
   * @example
   *  async myMethodImpl() {} // BAD!!! This method will be considered a test.
   *  async _myMethodImpl() {} // GOOD!!! This method will not be considered a test.
   *
   * @return {string[]}
   */
  get testNames(): string[]

  /**
   * Convert the test to Japa functions.
   *
   * @return {void}
   */
  convert(): void
}

export class TestResponse {
  /**
   * Assert the status code of the response.
   *
   * @param {number} number
   * @example
   *   response.assertStatusCode(200)
   */
  assertStatusCode(number: number): void

  /**
   * Assert the status code is not the same of the response.
   *
   * @param {number} number
   * @example
   *   response.assertIsNotStatusCode(200)
   */
  assertIsNotStatusCode(number: number): void

  /**
   * Assert body (array or object) to contain a subset of the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyContains({ id: 1 }) // passes
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyContains([{ id: 1 }, { id: 2 }]) // passes
   */
  assertBodyContains(values: any | any[]): void

  /**
   * Assert body (array or object) to not contain a subset of the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyNotContains({ id: 1 }) // fails
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyNotContains([{ id: 3 }]) // passes
   */
  assertBodyNotContains(values: any | any[]): void

  /**
   * Assert body to contain a key.
   *
   * @param {string} key
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyContainsKey('id') // passes
   */
  assertBodyContainsKey(key: string): void

  /**
   * Assert body to not contain a key.
   *
   * @param {string} key
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyNotContainsKey('id') // fails
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyNotContainsKey('createdAt') // passes
   */
  assertBodyNotContainsKey(key: string): void

  /**
   * Assert body to contain all keys.
   *
   * @param {string[]} keys
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyContainsAllKeys(['id', 'post']) // passes
   */
  assertBodyContainsAllKeys(keys: string[]): void

  /**
   * Assert body to not contain all keys.
   *
   * @param {string[]} keys
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyNotContainsAllKeys(['id']) // fails
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyNotContainsAllKeys(['createdAt']) // passes
   */
  assertBodyNotContainsAllKey(keys: string[]): void

  /**
   * Assert body (array or object) to be deep equal to the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyDeepEqual({ id: 1 }) // fails
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyDeepEqual([{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]) // passes
   */
  assertBodyDeepEqual(values: any | any[]): void

  /**
   * Assert body (array or object) to be not deep equal to the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyNotDeepEqual({ id: 1 }) // passes
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyNotDeepEqual([{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]) // fails
   */
  assertBodyNotDeepEqual(values: any | any[]): void

  /**
   * Assert body to be an array.
   *
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyIsArray() // fails
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyIsArray() // passes
   */
  assertBodyIsArray(): void

  /**
   * Assert body to not be an array.
   *
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyIsNotArray() // passes
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyIsNotArray() // fails
   */
  assertBodyIsNotArray(): void

  /**
   * Assert body to be an object.
   *
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyIsObject() // passes
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyIsObject() // fails
   */
  assertBodyIsObject(): void

  /**
   * Assert body to not be an object.
   *
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertBodyIsObject() // fails
   * @example
   *   const body = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertBodyIsObject() // passes
   */
  assertBodyIsNotObject(): void

  /**
   * Assert header (array or object) to contain a subset of the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const header = { id: 1, name: 'post 1' }
   *
   *   response.assertHeaderContains({ id: 1 }) // passes
   * @example
   *   const header = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertHeaderContains([{ id: 1 }, { id: 2 }]) // passes
   */
  assertHeaderContains(values: any | any[]): void

  /**
   * Assert header (array or object) to not contain a subset of the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const header = { id: 1, name: 'post 1' }
   *
   *   response.assertHeaderContains({ id: 1 }) // passes
   * @example
   *   const header = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertHeaderContains([{ id: 1 }, { id: 2 }]) // passes
   */
  assertHeaderNotContains(values: any | any[]): void

  /**
   * Assert header (array or object) to be deep equal to the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const header = { id: 1, name: 'post 1' }
   *
   *   response.assertHeaderDeepEqual({ id: 1 }) // fails
   * @example
   *   const header = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertHeaderDeepEqual([{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]) // passes
   */
  assertHeaderDeepEqual(values: any | any[]): void

  /**
   * Assert header (array or object) to be not deep equal to the expected value.
   *
   * @param {any|any[]} values
   * @example
   *   const header = { id: 1, name: 'post 1' }
   *
   *   response.assertHeaderNotDeepEqual({ id: 1 }) // passes
   * @example
   *   const header = [{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]
   *
   *   response.assertHeaderNotDeepEqual([{ id: 1, name: 'post 1' }, { id: 2, name: 'post 2'}]) // fails
   */
  assertHeaderNotDeepEqual(values: any | any[]): void

  /**
   * Assert header to contain a key.
   *
   * @param {string} key
   * @example
   *   const header = { id: 1, name: 'post 1' }
   *
   *   response.assertHeaderContainsKey('id') // passes
   */
  assertHeaderContainsKey(key: string): void

  /**
   * Assert header to not contain a key.
   *
   * @param {string} key
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertHeaderNotContainsKey('id') // fails
   * @example
   *   const body = { id: 1, name: 'post 1' }
   *
   *   response.assertHeaderNotContainsKey('createdAt') // passes
   */
  assertHeaderNotContainsKey(key: string): void
}

export class TestRequest {
  /**
   * Makes a request with GET http method.
   *
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  get(url: string, options?: InjectOptions): Promise<TestResponse>

  /**
   * Makes a request with HEAD http method.
   *
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  head(url: string, options?: InjectOptions): Promise<TestResponse>

  /**
   * Makes a request with OPTIONS http method.
   *
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  options(url: string, options?: InjectOptions): Promise<TestResponse>

  /**
   * Makes a request with POST http method.
   *
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  post(url: string, options?: InjectOptions): Promise<TestResponse>

  /**
   * Makes a request with PUT http method.
   *
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  put(url: string, options?: InjectOptions): Promise<TestResponse>

  /**
   * Makes a request with PATCH http method.
   *
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  patch(url: string, options?: InjectOptions): Promise<TestResponse>

  /**
   * Makes a request with DELETE http method.
   *
   * @param {string} url
   * @param {import('fastify').InjectOptions} options
   * @return {Promise<TestResponse>}
   */
  delete(url: string, options?: InjectOptions): Promise<TestResponse>
}

export class TestSuite {
  /**
   * Get the cli arguments when running the tests.
   *
   * @return {string[]}
   */
  static getArgs(): string[]

  /**
   * Resolve the import of the test files.
   *
   * @param {string} filePath
   * @return {Promise<void>}
   */
  static importer(filePath: string): Promise<void>

  /**
   * Creates the unit test suite.
   *
   * @param {any} suite
   */
  static unitSuite(suite: any): void

  /**
   * Creates the cli test suite.
   *
   * @param {any} suite
   */
  static cliEnd2EndSuite(suite: any): void

  /**
   * Creates the http test suite.
   *
   * @param {any} suite
   */
  static httpEnd2EndSuite(suite: any): void
}

export class TestLoader {
  /**
   * Return all commands from test package.
   *
   * @return {any[]}
   */
  static loadCommands(): any[]

  /**
   * Return all custom templates from test package.
   *
   * @return {any[]}
   */
  static loadTemplates(): any[]
}
