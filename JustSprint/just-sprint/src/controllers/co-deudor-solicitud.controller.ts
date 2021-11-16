import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CoDeudor,
  Solicitud,
} from '../models';
import {CoDeudorRepository} from '../repositories';

export class CoDeudorSolicitudController {
  constructor(
    @repository(CoDeudorRepository) protected coDeudorRepository: CoDeudorRepository,
  ) { }

  @get('/co-deudors/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of CoDeudor has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.coDeudorRepository.solicituds(id).find(filter);
  }

  @post('/co-deudors/{id}/solicituds', {
    responses: {
      '200': {
        description: 'CoDeudor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CoDeudor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInCoDeudor',
            exclude: ['id'],
            optional: ['coDeudorId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.coDeudorRepository.solicituds(id).create(solicitud);
  }

  @patch('/co-deudors/{id}/solicituds', {
    responses: {
      '200': {
        description: 'CoDeudor.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.coDeudorRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/co-deudors/{id}/solicituds', {
    responses: {
      '200': {
        description: 'CoDeudor.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.coDeudorRepository.solicituds(id).delete(where);
  }
}
