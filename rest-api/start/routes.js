'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')
const UserController = require('../app/Controllers/Http/UserController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON otra ' }
})
//ejemplo de ruta
//Route.post('users/register','UserController.store')
//ejemplo con arupamiento y prefijo
Route.group(()=>{
  Route.post('users/register','UserController.store');
  Route.post('users/login','UserController.login');
  //rutas proyectos
  Route.get('project','ProjectController.index').middleware('auth');
  Route.post('project/create','ProjectController.create').middleware('auth');
  Route.delete('project/:id','ProjectController.destroy').middleware('auth');
  Route.patch('project/:id','ProjectController.update').middleware('auth');
  //rutas tareas
  Route.post('project/:id/tarea','TareaController.create').middleware('auth');
  Route.get('project/:id/tarea','TareaController.index').middleware('auth'); 
  Route.patch('tareas/:id/','TareaController.update').middleware('auth'); 
  Route.delete('tareas/:id/','TareaController.destroy').middleware('auth');
  
}).prefix('api/v1/');
//para manejar otra version podriamos crear otro prefijo