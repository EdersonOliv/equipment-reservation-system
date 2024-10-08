import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reserve extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public date_reserved: DateTime

  @column.dateTime({ autoUpdate: true })
  public date_returned: DateTime

  @column()
  public userId: number

  @column()
  public equipmentId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
