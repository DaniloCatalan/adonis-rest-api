const  AccesInvalid  = use('App/Exceptions/AccesForbiddenException')
const  ResourceNotFoundException  = use('App/Exceptions/ResourceNotFoundException')

class AuthorizationService{
    verifyPermission(resource,user){
        if(!resource){
            throw new ResourceNotFoundException();
        }
        if(resource.user_id !== user.id){
            throw new AccesInvalid();
        }
    }
}
module.exports = new AuthorizationService();