import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      return response.status(401).json({ error: 'Invalid credentials' })
    }
  }

  public async destroy({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.status(203)
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').logout()
    return response.ok({ message: 'Logged out successfully' })
  }
}
