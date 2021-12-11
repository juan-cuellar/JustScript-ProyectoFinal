import {belongsTo, Entity, model, property} from '@loopback/repository';
import {CoDeudor} from './co-deudor.model';
import {RegistroClientes} from './registro-clientes.model';
import {Vehiculos} from './vehiculos.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: false,
  })
  clienteid: string;

  @property({
    type: 'string',
    required: false,
  })
  productoid: string;


  @property({
    type: 'string',
    required: false,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'boolean',
    required: false,
  })
  co_deudor: boolean;

  @property({
    type: 'string',
    required: false,
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
