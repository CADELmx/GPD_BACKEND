import { PartialType } from '@nestjs/mapped-types';
import { CreatePartialTemplateDto } from './create-partial-template.dto';

export class UpdatePartialTemplateDto extends PartialType(
  CreatePartialTemplateDto,
) {
  name?: string;
  gender?: string;
  position?: string;
  total?: number;
  status?: string;
  year?: string;
  period?: string;
}
