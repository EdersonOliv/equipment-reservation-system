import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Reserve from './Reserve'

export default class Equipment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public category: string

  @column()
  public quantity: number

  @column()
  public quant_available: number

  @hasMany(() => Reserve)
  public reserved: HasMany<typeof Reserve>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
