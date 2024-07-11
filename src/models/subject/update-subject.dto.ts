import { PartialType } from "@nestjs/mapped-types"
import { CreateSubjectDto } from "./create-subject.dto"

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
    totalHours?: number
    weeklyHours?: number
    monthPeriod?: string
    subjectName?: string
}