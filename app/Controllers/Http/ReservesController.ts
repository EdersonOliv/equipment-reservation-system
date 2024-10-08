import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserve from '../../Models/Reserve'
import Equipment from 'App/Models/Equipment'

export default class ReservesController {
  public async index({ auth }: HttpContextContract) {
      const user = await auth.authenticate()
      const reserves = await Reserve.query().where('user_id', user.id)
      return reserves
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const user_id = user.$getAttribute('id')
    const { equipment_id } = request.only(['equipment_id'])
    const equipment = await Equipment.query().where('equipment_id', 'id')
    console.log(equipment)
    const reserve = await user.related('reserves').create(equipment_id, user_id)
    return reserve
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const reserve = await Reserve.findByOrFail('id', params.id)
      await reserve.load('equipment')
      return response.status(200).json(reserve)
    } catch (error) {
      console.error(error)
      return response.status(404).json({ error: 'Reserve not found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { date_reserved } = request.only(['date_reserved'])
      const reserve = await Reserve.findByOrFail('id', params.id)
      reserve.merge({ date_reserved })
      await reserve.save()
      return response.status(200).json(reserve)
    } catch (error) {
      console.error(error)
      return response.status(404).json({ error: 'Reserve not found' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const reserve = await Reserve.findByOrFail('id', params.id)
      await reserve.delete()
      return response.status(203).json({ message: 'Reserve successfully deleted' })
    } catch (error) {
      console.error(error)
      return response.status(404).json({ error: 'Reserve not found' })
    }
  }
}
