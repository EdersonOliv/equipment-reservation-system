import Route from '@ioc:Adonis/Core/Route'

Route.post('/session', 'SessionsController.store')
Route.delete('/session', 'SessionsController.destroy').middleware('auth')

Route.resource('/user', 'UsersController').apiOnly()
Route.resource('/equipment', 'EquipmentsController').apiOnly()
Route.group(() => {
  Route.resource('/reserve', 'ReservesController').apiOnly()
}).middleware('auth')
