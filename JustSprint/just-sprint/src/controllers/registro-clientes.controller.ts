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
import {RegistroClientes} from '../models';
import {RegistroClientesRepository} from '../repositories';

export class RegistroClientesController {
  constructor(
    @repository(RegistroClientesRepository)
    public registroClientesRepository : RegistroClientesRepository,
  ) {}

  @post('/registro-clientes')
  @response(200, {
    description: 'RegistroClientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroClientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroClientes, {
            title: 'NewRegistroClientes',
            exclude: ['id'],
          }),
        },
      },
    })
    registroClientes: Omit<RegistroClientes, 'id'>,
  ): Promise<RegistroClientes> {
    return this.registroClientesRepository.create(registroClientes);
  }

  @get('/registro-clientes/count')
  @response(200, {
    description: 'RegistroClientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroClientes) where?: Where<RegistroClientes>,
  ): Promise<Count> {
    return this.registroClientesRepository.count(where);
  }

  @get('/registro-clientes')
  @response(200, {
    description: 'Array of RegistroClientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroClientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroClientes) filter?: Filter<RegistroClientes>,
  ): Promise<RegistroClientes[]> {
    return this.registroClientesRepository.find(filter);
  }

  @patch('/registro-clientes')
  @response(200, {
    description: 'RegistroClientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroClientes, {partial: true}),
        },
      },
    })
    registroClientes: RegistroClientes,
    @param.where(RegistroClientes) where?: Where<RegistroClientes>,
  ): Promise<Count> {
    return this.registroClientesRepository.updateAll(registroClientes, where);
  }

  @get('/registro-clientes/{id}')
  @response(200, {
    description: 'RegistroClientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroClientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RegistroClientes, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroClientes>
  ): Promise<RegistroClientes> {
    return this.registroClientesRepository.findById(id, filter);
  }

  @patch('/registro-clientes/{id}')
  @response(204, {
    description: 'RegistroClientes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroClientes, {partial: true}),
        },
      },
    })
    registroClientes: RegistroClientes,
  ): Promise<void> {
    await this.registroClientesRepository.updateById(id, registroClientes);
  }

  @put('/registro-clientes/{id}')
  @response(204, {
    description: 'RegistroClientes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registroClientes: RegistroClientes,
  ): Promise<void> {
    await this.registroClientesRepository.replaceById(id, registroClientes);
  }

  @del('/registro-clientes/{id}')
  @response(204, {
    description: 'RegistroClientes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registroClientesRepository.deleteById(id);
  }
}
