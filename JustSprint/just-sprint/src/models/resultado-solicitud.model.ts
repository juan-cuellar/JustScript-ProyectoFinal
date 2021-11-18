import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

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
  comentario: string;

  @belongsTo(() => Solicitud)
  solicitudId: string;

  constructor(data?: Partial<ResultadoSolicitud>) {
    super(data);
  }
}

export interface ResultadoSolicitudRelations {
  // describe navigational properties here
}

export type ResultadoSolicitudWithRelations = ResultadoSolicitud & ResultadoSolicitudRelations;
