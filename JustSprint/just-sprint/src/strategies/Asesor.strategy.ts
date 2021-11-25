import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Request} from '@loopback/express';
import {HttpErrors, RedirectRoute} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class AsesorEstrategia implements AuthenticationStrategy{
  name: string = "Asesor";

  constructor(
    @service(AutenticacionService)
    public AutenticacionServicio : AutenticacionService,
  ){


  }

  async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if(token){
      let datos = this.AutenticacionServicio.ValidarTokenJWT(token)
      if(datos){
        if(datos.data.roles == "Asesor"){
          return datos
        }else{
          throw new HttpErrors[401]("No esta autorizado para realizar la acción solicitada")
        }
      }else{
        throw new HttpErrors[401]("El token ingresado no es valido")
      }
    }else{
      throw new HttpErrors[401]("No se ha recibido ningun token")

    }
  }

}

