import {Entity, model, property, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Estado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  estado: string[];

  @hasOne(() => Solicitud)
  solicitud: Solicitud;

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
