import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Credenciales, CredencialesRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class CredencialesRepository extends DefaultCrudRepository<
  Credenciales,
  typeof Credenciales.prototype.id,
  CredencialesRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Credenciales.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Credenciales, dataSource);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
