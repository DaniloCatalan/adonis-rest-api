'use strict'
const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

class ProjectController {
    async index({ auth }){
        const user = await auth.getUser()
        console.log(user.id);
        return await user.projects().fetch();    
    }
    async create({ auth,request}){
        const user = await auth.getUser();
        const { nombre } = request.all();
        const project = new Project();
        //cuando es solo uno se puede asi 
        //project.nombre = nombre;
        project.fill({
            nombre
        }); 
        await user.projects().save(project);
        return project;
    }
    async destroy({auth,params}){
        const user  = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project,user);
        await project.delete();
        return project;
    }
    async update({auth,params,request}){
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project,user);
        project.merge(request.only('nombre'));
        await project.save();
        return project;

    }
}

module.exports = ProjectController
