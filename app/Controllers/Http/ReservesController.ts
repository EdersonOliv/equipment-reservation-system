import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserve from '../../Models/Reserve'

export default class ReservesController {
  public async index({ response }: HttpContextContract) {
    try {
      const reserves = await Reserve.query().preload('equipment')
      return response.status(200).json(reserves)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Failed to fetch reserves' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const { date_reserved } = request.only(['user_id', 'date_reserved'])
      const reserve = await Reserve.create({ date_reserved })
      return response.status(201).json(reserve)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Failed to create reserve' })
    }
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
