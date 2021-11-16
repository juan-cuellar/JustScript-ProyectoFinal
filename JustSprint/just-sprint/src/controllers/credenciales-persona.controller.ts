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
  Credenciales,
  Persona,
} from '../models';
import {CredencialesRepository} from '../repositories';

export class CredencialesPersonaController {
  constructor(
    @repository(CredencialesRepository) protected credencialesRepository: CredencialesRepository,
  ) { }

  @get('/credenciales/{id}/persona', {
    responses: {
      '200': {
        description: 'Credenciales has one Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona> {
    return this.credencialesRepository.persona(id).get(filter);
  }

  @post('/credenciales/{id}/persona', {
    responses: {
      '200': {
        description: 'Credenciales model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Credenciales.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInCredenciales',
            exclude: ['id'],
            optional: ['credencialesId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.credencialesRepository.persona(id).create(persona);
  }

  @patch('/credenciales/{id}/persona', {
    responses: {
      '200': {
        description: 'Credenciales.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.credencialesRepository.persona(id).patch(persona, where);
  }

  @del('/credenciales/{id}/persona', {
    responses: {
      '200': {
        description: 'Credenciales.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.credencialesRepository.persona(id).delete(where);
  }
}
