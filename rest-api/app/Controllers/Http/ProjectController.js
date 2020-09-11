'use strict'
const Project = use('App/Models/Project');

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
    };

}

module.exports = ProjectController
