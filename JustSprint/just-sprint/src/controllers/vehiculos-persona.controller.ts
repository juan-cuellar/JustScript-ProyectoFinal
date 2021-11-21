import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculos,
  Persona,
} from '../models';
import {VehiculosRepository} from '../repositories';

export class VehiculosPersonaController {
  constructor(
    @repository(VehiculosRepository)
    public vehiculosRepository: VehiculosRepository,
  ) { }

  @get('/vehiculos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Vehiculos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Vehiculos.prototype.id,
  ): Promise<Persona> {
    return this.vehiculosRepository.persona(id);
  }
}
