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
  RegistroClientes,
  Solicitud,
} from '../models';
import {RegistroClientesRepository} from '../repositories';

export class RegistroClientesSolicitudController {
  constructor(
    @repository(RegistroClientesRepository) protected registroClientesRepository: RegistroClientesRepository,
  ) { }

  @get('/registro-clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of RegistroClientes has many Solicitud',
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
    return this.registroClientesRepository.solicituds(id).find(filter);
  }

  @post('/registro-clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'RegistroClientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof RegistroClientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInRegistroClientes',
            exclude: ['id'],
            optional: ['registroClientesId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.registroClientesRepository.solicituds(id).create(solicitud);
  }

  @patch('/registro-clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'RegistroClientes.Solicitud PATCH success count',
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
    return this.registroClientesRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/registro-clientes/{id}/solicituds', {
    responses: {
      '200': {
        description: 'RegistroClientes.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.registroClientesRepository.solicituds(id).delete(where);
  }
}
