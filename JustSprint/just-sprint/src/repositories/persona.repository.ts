import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';


export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculos, typeof Persona.prototype.id>;


  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>, 
  ) {
    super(Persona, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
