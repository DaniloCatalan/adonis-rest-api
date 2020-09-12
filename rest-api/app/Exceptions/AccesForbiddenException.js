'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccesForbiddenException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error,{ response }) {
     return response.status(403).json({
       error:'Acces Inavalid for the resource'
     })
   }
}

module.exports = AccesForbiddenException
