import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateSubjectDto {
    @IsNotEmpty({message: 'El programa educativo no puede estar vacío'})
    @IsString({message: 'El programa educativo debe ser un texto'})
    educationalProgramId: number
    @IsInt({message: 'El total de horas debe ser un número entero'})
    totalHours: number
    @IsInt({message: 'Las horas semanales deben ser un número entero'})
    weeklyHours: number
    @IsNotEmpty({message: 'El periodo no puede estar vacío'})
    @IsString({message: 'El periodo debe ser un texto'})
    monthPeriod: string
    @IsNotEmpty({message: 'El nombre de la materia no puede estar vacío'})
    @IsString({message: 'El nombre de la materia debe ser un texto'})
    subjectName: string
}