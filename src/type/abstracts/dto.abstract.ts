export abstract class DtoAbstract<TEntity> {
  abstract fromEntity(entity: TEntity): DtoAbstract<TEntity>;
}
