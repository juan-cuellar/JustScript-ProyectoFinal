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
  CoDeudor,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudCoDeudorController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/co-deudor', {
    responses: {
      '200': {
        description: 'CoDeudor belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CoDeudor)},
          },
        },
      },
    },
  })
  async getCoDeudor(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<CoDeudor> {
    return this.solicitudRepository.coDeudor(id);
  }
}
