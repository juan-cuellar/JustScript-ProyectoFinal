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
  Vehiculos,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudVehiculosController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculos belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async getVehiculos(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Vehiculos> {
    return this.solicitudRepository.vehiculos(id);
  }
}
