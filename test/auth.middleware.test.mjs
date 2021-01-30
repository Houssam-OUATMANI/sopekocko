import chai from 'chai'

import authMiddleware from '../middlewares/auth.middleware.mjs'

describe('authentification middleware tests : ', ()=> {

    it('should log an error whether no auth token is provided', ()=>{
       const req = {
           headers : {
               authorization : undefined
           }
       }
       chai.expect(authMiddleware.bind(this, req, {}, ()=> {})).to.throw("Cannot read property 'split' of undefined")
    })
        
    it('should log an error whether auth is one string ', ()=>{
        const req = {
            headers : {
                authorization : "sopekocko"
            }
        }
        chai.expect(authMiddleware.bind(this, req, {}, ()=> {})).to.throw()
     })


})