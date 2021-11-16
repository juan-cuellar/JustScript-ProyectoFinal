import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculos, VehiculosRelations, Persona, Solicitud} from '../models';
import {PersonaRepository} from './persona.repository';
import {SolicitudRepository} from './solicitud.repository';

export class VehiculosRepository extends DefaultCrudRepository<
  Vehiculos,
  typeof Vehiculos.prototype.id,
  VehiculosRelations
> {

  public readonly personas: HasManyRepositoryFactory<Persona, typeof Vehiculos.prototype.id>;

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Vehiculos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Vehiculos, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
