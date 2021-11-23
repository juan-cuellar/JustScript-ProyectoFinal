import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Vehiculos, Roles} from '../models';
import {VehiculosRepository} from './vehiculos.repository';
import {RolesRepository} from './roles.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculos, typeof Persona.prototype.id>;

  public readonly roles: HasOneRepositoryFactory<Roles, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Persona, dataSource);
    this.roles = this.createHasOneRepositoryFactoryFor('roles', rolesRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
