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
  Vehiculos,
  Persona,
} from '../models';
import {VehiculosRepository} from '../repositories';

export class VehiculosPersonaController {
  constructor(
    @repository(VehiculosRepository) protected vehiculosRepository: VehiculosRepository,
  ) { }

  @get('/vehiculos/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Vehiculos has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.vehiculosRepository.personas(id).find(filter);
  }

  @post('/vehiculos/{id}/personas', {
    responses: {
      '200': {
        description: 'Vehiculos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInVehiculos',
            exclude: ['id'],
            optional: ['vehiculosId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.vehiculosRepository.personas(id).create(persona);
  }

  @patch('/vehiculos/{id}/personas', {
    responses: {
      '200': {
        description: 'Vehiculos.Persona PATCH success count',
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
    return this.vehiculosRepository.personas(id).patch(persona, where);
  }

  @del('/vehiculos/{id}/personas', {
    responses: {
      '200': {
        description: 'Vehiculos.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.vehiculosRepository.personas(id).delete(where);
  }
}
