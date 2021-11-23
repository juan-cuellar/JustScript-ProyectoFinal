import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { PersonaRepository } from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
import {Persona} from '../models';
import {Llaves} from '../config/llaves';

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository
  ) {}

  /*
   * Add service methods here
   */


  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(correo:string, clave:string){
    try {
      let p = this.personaRepository.findOne({where: {correo: correo, clave: clave}});

      if (p) {
        return p;
      }
      return false;

    } catch {
      return false;
    }
  }

  GenerarTokenJWT(persona: Persona) {
    let token = jwt.sign({
      data: {
        id: persona.id,
        correo: persona.correo,
        nombre: persona.nombre + " " + persona.apellido,
        roles: persona.nombreRol,
        telefono: persona.telefono
      }
    },
      Llaves.claveJWT);
    return token;
  }



  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }


  }




