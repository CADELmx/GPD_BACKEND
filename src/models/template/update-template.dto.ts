import { PartialType } from '@nestjs/mapped-types';
import { CreateTemplateDto } from './create-template.dto';

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {
  state?: string;
  areaId?: number;
  period?: string;
  responsibleId?: number;
  revisedById?: number;
}