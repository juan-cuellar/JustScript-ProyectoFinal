import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ResultadoSolicitud, ResultadoSolicitudRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class ResultadoSolicitudRepository extends DefaultCrudRepository<
  ResultadoSolicitud,
  typeof ResultadoSolicitud.prototype.id,
  ResultadoSolicitudRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof ResultadoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(ResultadoSolicitud, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
