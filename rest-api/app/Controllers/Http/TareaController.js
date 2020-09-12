'use strict'

const Tarea = require("../../Models/Tarea");
const Project  = use('App/Models/Project')
const AuthorizationService = use('App/Services/AuthorizationService');


class TareaController {
    async index({auth,request,params}){
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project,user);
        return await project.tareas().fetch();


    }
    async create({auth,request,params}){
        const user = await auth.getUser();
        const { description} = request.all();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project,user);
        const tarea  = new Tarea();
        tarea.fill({
            description
        });
        await project.tareas().save(tarea);
        return tarea;
    }

    async update({auth,params,request}){
        const user  = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const project = await tarea.project().fetch();
        AuthorizationService.verifyPermission(project,user);
        tarea.merge(request.only([
            'description',
            'completed'
        ]))
        await tarea.save();
        return tarea;
    }

    async destroy({auth,params}){
        const user  = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const project = await tarea.project().fetch();
        AuthorizationService.verifyPermission(project,user);
        await tarea.delete();
        return tarea;
    }   
}

module.exports = TareaController
