import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class UsersController {
  public async index() {
    const users = await User.query()
    return users
  }

  public async store({ request }: HttpContextContract) {
    const { name, cpf, email, password, telephone } = request.only([
      'name',
      'cpf',
      'email',
      'password',
      'telephone',
    ])
    const user = await User.create({
      name,
      cpf,
      email,
      password,
      telephone,
    })
    return user
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', params.id)
      return user
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { name, cpf, email, password, telephone } = request.only([
        'name',
        'cpf',
        'email',
        'password',
        'telephone',
      ])
      const user = await User.findByOrFail('id', params.id)
      user.merge({ name, cpf, email, password, telephone })
      await user.save()
      return user
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203)
    } catch {
      return response.status(400).json({ error: 'User not found' })
    }
  }
}
