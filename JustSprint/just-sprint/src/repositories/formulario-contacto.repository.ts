import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {FormularioContacto, FormularioContactoRelations} from '../models';

export class FormularioContactoRepository extends DefaultCrudRepository<
  FormularioContacto,
  typeof FormularioContacto.prototype.id,
  FormularioContactoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(FormularioContacto, dataSource);
  }
}
