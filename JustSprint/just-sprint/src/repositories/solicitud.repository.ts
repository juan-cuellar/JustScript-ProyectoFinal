import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, RegistroClientes, Vehiculos, CoDeudor} from '../models';
import {RegistroClientesRepository} from './registro-clientes.repository';
import {VehiculosRepository} from './vehiculos.repository';
import {CoDeudorRepository} from './co-deudor.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly registroClientes: BelongsToAccessor<RegistroClientes, typeof Solicitud.prototype.id>;

  public readonly vehiculos: BelongsToAccessor<Vehiculos, typeof Solicitud.prototype.id>;

  public readonly coDeudor: BelongsToAccessor<CoDeudor, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RegistroClientesRepository') protected registroClientesRepositoryGetter: Getter<RegistroClientesRepository>, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>, @repository.getter('CoDeudorRepository') protected coDeudorRepositoryGetter: Getter<CoDeudorRepository>,
  ) {
    super(Solicitud, dataSource);
    this.coDeudor = this.createBelongsToAccessorFor('coDeudor', coDeudorRepositoryGetter,);
    this.registerInclusionResolver('coDeudor', this.coDeudor.inclusionResolver);
    this.vehiculos = this.createBelongsToAccessorFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.registroClientes = this.createBelongsToAccessorFor('registroClientes', registroClientesRepositoryGetter,);
    this.registerInclusionResolver('registroClientes', this.registroClientes.inclusionResolver);
  }
}
