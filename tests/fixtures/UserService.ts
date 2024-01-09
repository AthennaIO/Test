/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class UserService {
  public async find() {
    return [
      {
        id: 1,
        name: 'João Lenon',
        email: 'lenon@athenna.io'
      }
    ]
  }

  public async findById(id?: number) {
    const users = await this.find()

    return users.find(user => user.id === id)
  }

  public findSync() {
    return [
      {
        id: 1,
        name: 'João Lenon',
        email: 'lenon@athenna.io'
      }
    ]
  }

  public throw() {
    throw new Error('User not found')
  }

  public async reject() {
    throw new Error('User not found')
  }
}
