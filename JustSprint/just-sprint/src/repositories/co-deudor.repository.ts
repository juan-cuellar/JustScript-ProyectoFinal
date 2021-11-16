import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CoDeudor, CoDeudorRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class CoDeudorRepository extends DefaultCrudRepository<
  CoDeudor,
  typeof CoDeudor.prototype.id,
  CoDeudorRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof CoDeudor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(CoDeudor, dataSource);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
