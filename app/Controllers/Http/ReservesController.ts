import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserve from '../../Models/Reserve'
import Equipment from 'App/Models/Equipment'

export default class ReservesController {
  public async index({ response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate()
      const reserves = await Reserve.query().where('user_id', user.id)
      return response.status(200).json(reserves)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Reserve not found' })
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate()
      const user_id = user.$getAttribute('id')
      const { equipment_id } = request.only(['equipment_id'])
      const equipment = await Equipment.findByOrFail('id', equipment_id)
      if (equipment.quant_available > 0) {
        const reserve = await user.related('reserves').create(user_id, equipment_id)
        await equipment.related('reserved').create(user_id, equipment_id)
        const quant_available = equipment.quant_available - 1
        equipment.merge({ quant_available })
        await equipment.save()
        return response.status(201).json({ reserve: {
          id: reserve.id,
          name: user.name,
          user_id: user.id,
          equipment_id: equipment.id
        } })
      } else {
        return response.status(423).json({ error: 'Equipment not available' })
      }
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Reserve not found' })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const reserve = await Reserve.findByOrFail('id', params.id)
      await reserve.load(() => Equipment)
      return response.status(200).json(reserve)
    } catch (error) {
      console.error(error)
      return response.status(404).json({ error: 'Reserve not found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { status } = request.only(['status'])
      const reserve = await Reserve.findByOrFail('id', params.id)
      reserve.merge({ status })
      await reserve.save()
      if(status == false) {
        const equipment = await Equipment.findByOrFail('id', reserve.equipmentId)
        const quant_available = equipment.quant_available + 1
        equipment.merge({ quant_available })
        await equipment.save()
      }
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
