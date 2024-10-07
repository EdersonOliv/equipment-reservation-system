import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Equipment from './Equipment'
import User from './User'

export default class Reserve extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public date_reserved: DateTime

  @column()
  public date_returned: DateTime

  @hasMany(() => Equipment)
  public equipment: HasMany<typeof Equipment>

  @hasMany(() => User)
  public user: HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
