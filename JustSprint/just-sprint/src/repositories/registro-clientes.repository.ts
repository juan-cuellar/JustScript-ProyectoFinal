import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RegistroClientes, RegistroClientesRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class RegistroClientesRepository extends DefaultCrudRepository<
  RegistroClientes,
  typeof RegistroClientes.prototype.id,
  RegistroClientesRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof RegistroClientes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(RegistroClientes, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
