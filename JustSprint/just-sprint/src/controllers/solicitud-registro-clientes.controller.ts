import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  RegistroClientes,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudRegistroClientesController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/registro-clientes', {
    responses: {
      '200': {
        description: 'RegistroClientes belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroClientes)},
          },
        },
      },
    },
  })
  async getRegistroClientes(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<RegistroClientes> {
    return this.solicitudRepository.registroClientes(id);
  }
}
