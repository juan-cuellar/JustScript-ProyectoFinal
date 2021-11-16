import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ResultadoSolicitud} from '../models';
import {ResultadoSolicitudRepository} from '../repositories';

export class ResultadoSolicitudController {
  constructor(
    @repository(ResultadoSolicitudRepository)
    public resultadoSolicitudRepository : ResultadoSolicitudRepository,
  ) {}

  @post('/resultado-solicituds')
  @response(200, {
    description: 'ResultadoSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResultadoSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoSolicitud, {
            title: 'NewResultadoSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    resultadoSolicitud: Omit<ResultadoSolicitud, 'id'>,
  ): Promise<ResultadoSolicitud> {
    return this.resultadoSolicitudRepository.create(resultadoSolicitud);
  }

  @get('/resultado-solicituds/count')
  @response(200, {
    description: 'ResultadoSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResultadoSolicitud) where?: Where<ResultadoSolicitud>,
  ): Promise<Count> {
    return this.resultadoSolicitudRepository.count(where);
  }

  @get('/resultado-solicituds')
  @response(200, {
    description: 'Array of ResultadoSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResultadoSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResultadoSolicitud) filter?: Filter<ResultadoSolicitud>,
  ): Promise<ResultadoSolicitud[]> {
    return this.resultadoSolicitudRepository.find(filter);
  }

  @patch('/resultado-solicituds')
  @response(200, {
    description: 'ResultadoSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoSolicitud, {partial: true}),
        },
      },
    })
    resultadoSolicitud: ResultadoSolicitud,
    @param.where(ResultadoSolicitud) where?: Where<ResultadoSolicitud>,
  ): Promise<Count> {
    return this.resultadoSolicitudRepository.updateAll(resultadoSolicitud, where);
  }

  @get('/resultado-solicituds/{id}')
  @response(200, {
    description: 'ResultadoSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResultadoSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ResultadoSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<ResultadoSolicitud>
  ): Promise<ResultadoSolicitud> {
    return this.resultadoSolicitudRepository.findById(id, filter);
  }

  @patch('/resultado-solicituds/{id}')
  @response(204, {
    description: 'ResultadoSolicitud PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultadoSolicitud, {partial: true}),
        },
      },
    })
    resultadoSolicitud: ResultadoSolicitud,
  ): Promise<void> {
    await this.resultadoSolicitudRepository.updateById(id, resultadoSolicitud);
  }

  @put('/resultado-solicituds/{id}')
  @response(204, {
    description: 'ResultadoSolicitud PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() resultadoSolicitud: ResultadoSolicitud,
  ): Promise<void> {
    await this.resultadoSolicitudRepository.replaceById(id, resultadoSolicitud);
  }

  @del('/resultado-solicituds/{id}')
  @response(204, {
    description: 'ResultadoSolicitud DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.resultadoSolicitudRepository.deleteById(id);
  }
}
