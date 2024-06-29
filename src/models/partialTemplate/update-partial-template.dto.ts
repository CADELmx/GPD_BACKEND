import { PartialType } from '@nestjs/mapped-types';
import { CreatePartialTemplateDto } from './create-partial-template.dto';

export class UpdatePartialTemplateDto extends PartialType(CreatePartialTemplateDto) {}
