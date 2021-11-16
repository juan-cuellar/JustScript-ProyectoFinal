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
  Persona,
  Vehiculos,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaVehiculosController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Persona has many Vehiculos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculos>,
  ): Promise<Vehiculos[]> {
    return this.personaRepository.vehiculos(id).find(filter);
  }

  @post('/personas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'id'>,
  ): Promise<Vehiculos> {
    return this.personaRepository.vehiculos(id).create(vehiculos);
  }

  @patch('/personas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Persona.Vehiculos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {partial: true}),
        },
      },
    })
    vehiculos: Partial<Vehiculos>,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.personaRepository.vehiculos(id).patch(vehiculos, where);
  }

  @del('/personas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Persona.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.personaRepository.vehiculos(id).delete(where);
  }
}
