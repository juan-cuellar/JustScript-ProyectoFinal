import {Entity, model, property, belongsTo} from '@loopback/repository';
import {RegistroClientes} from './registro-clientes.model';
import {Vehiculos} from './vehiculos.model';
import {CoDeudor} from './co-deudor.model';

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
  imagen: string;

  @property({
    type: 'boolean',
    required: true,
  })
  co_deudor: boolean;
  @property({
    type: 'string',
  })
  estadoId?: string;

  @belongsTo(() => RegistroClientes)
  registroClientesId: string;

  @belongsTo(() => Vehiculos)
  vehiculosId: string;

  @belongsTo(() => CoDeudor)
  coDeudorId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
