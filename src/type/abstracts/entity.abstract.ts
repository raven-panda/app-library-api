export abstract class EntityAbstract<TCreateDto, TUpdateDto> {
  abstract fromDto(
    entity: TCreateDto | TUpdateDto,
    isCreate: boolean,
  ): EntityAbstract<TCreateDto, TUpdateDto>;
}
