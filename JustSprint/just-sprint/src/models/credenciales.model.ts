import {Entity, model, property, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Credenciales extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  id_persona: string;

  @hasOne(() => Persona)
  persona: Persona;

  constructor(data?: Partial<Credenciales>) {
    super(data);
  }
}

export interface CredencialesRelations {
  // describe navigational properties here
}

export type CredencialesWithRelations = Credenciales & CredencialesRelations;
