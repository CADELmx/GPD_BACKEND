import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalProgramDto } from './create-educational-program.dto';

export class UpdateEducationalProgramDto extends PartialType(CreateEducationalProgramDto) {
    abbreviation? : string
    description?: string
    areaId?: string
}
