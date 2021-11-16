import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Roles, RolesRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Roles, dataSource);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
