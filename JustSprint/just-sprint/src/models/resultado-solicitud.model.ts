import {Entity, model, property} from '@loopback/repository';

@model()
export class ResultadoSolicitud extends Entity {
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
  id_solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;


  constructor(data?: Partial<ResultadoSolicitud>) {
    super(data);
  }
}

export interface ResultadoSolicitudRelations {
  // describe navigational properties here
}

export type ResultadoSolicitudWithRelations = ResultadoSolicitud & ResultadoSolicitudRelations;
