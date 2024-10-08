import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Equipment from '../../Models/Equipment'

export default class EquipmentsController {
  public async index() {
    const equipment = await Equipment.query()
    return equipment
  }

  public async store({ request }: HttpContextContract) {
    const { name, category, quantity, quant_available } = request.only([
      'name',
      'category',
      'quantity',
      'quant_available',
    ])
    const equipment = await Equipment.create({
      name,
      category,
      quantity,
      quant_available,
    })
    return equipment
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const equipment = await Equipment.findByOrFail('id', params.id)
      return equipment
    } catch (error) {
      return response.status(400).json({ error: 'Equipment not found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { name, category, quantity, quant_available } = request.only([
        'name',
        'category',
        'quantity',
        'quant_available',
      ])
      const equipment = await Equipment.findByOrFail('id', params.id)
      equipment.merge({ name, category, quantity, quant_available })
      await equipment.save()
      return equipment
    } catch (error) {
      return response.status(400).json({ error: 'Equipment not found' })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const equipment = await Equipment.findByOrFail('id', params.id)
      await equipment.delete()
      return response.status(203)
    } catch {
      return response.status(400).json({ error: 'Equipment not found' })
    }
  }
}
