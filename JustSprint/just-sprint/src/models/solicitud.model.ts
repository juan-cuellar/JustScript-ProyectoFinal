import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  id_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_registroCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  id_estado: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'boolean',
    required: true,
  })
  co_deudor: boolean;

  @property({
    type: 'string',
  })
  coDeudorId?: string;

  @property({
    type: 'string',
  })
  estadoId?: string;

  @property({
    type: 'string',
  })
  registroClientesId?: string;

  @property({
    type: 'string',
  })
  vehiculosId?: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
