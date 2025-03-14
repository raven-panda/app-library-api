export abstract class EntityAbstract<TCreateDto, TUpdateDto> {
  abstract fromDto(entity: TCreateDto | TUpdateDto): EntityAbstract<TCreateDto, TUpdateDto>;
}
