import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ResultadoSolicitud,
  Solicitud,
} from '../models';
import {ResultadoSolicitudRepository} from '../repositories';

export class ResultadoSolicitudSolicitudController {
  constructor(
    @repository(ResultadoSolicitudRepository)
    public resultadoSolicitudRepository: ResultadoSolicitudRepository,
  ) { }

  @get('/resultado-solicituds/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to ResultadoSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof ResultadoSolicitud.prototype.id,
  ): Promise<Solicitud> {
    return this.resultadoSolicitudRepository.solicitud(id);
  }
}
