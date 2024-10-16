import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateActivityDto {
    @IsInt({ message: 'El ID de Programa educativo debe ser un número entero' })
    @Min(1, { message: 'El ID de Programa educativo debe ser mayor o igual a 1' })
    educationalProgramId?: number;
    @IsInt({ message: 'El ID de Plantilla parcial debe ser un número entero' })
    @Min(1, { message: 'El ID de Plantilla parcial debe ser mayor o igual a 1' })
    @IsNotEmpty({ message: 'El Id de Plantilla no puede estar vacío' })
    partialTemplateId: number;
    @IsString({ message: 'El distribución de actividades tiene que ser un texto' })
    @IsNotEmpty({ message: 'La distribución de actividades no puede estar vacía' })
    activityDistribution: string;
    @IsOptional()
    @IsString({ message: 'El tipo de gestión tiene que ser un texto' })
    managementType?: string;
    @IsOptional()
    @IsString({ message: 'El tipo de estadía tiene que ser un texto' })
    stayType?: string;
    @IsOptional()
    @IsString({ message: 'El nombre de la actividad tiene que ser un texto' })
    activityName?: string;
    @IsOptional()
    @IsString({ message: 'Los grupos de grado deben ser un texto', each: true })
    gradeGroups?: string[];
    @IsInt({ message: 'El número de horas semanales debe ser un número entero' })
    @IsNotEmpty({ message: 'Las horras semanales no pueden estar vacías' })
    weeklyHours: number;
    @IsInt({ message: 'El subtotal por clasificación debe ser un número entero' })
    @IsNotEmpty({ message: 'El subtotal por clasificación no puede estar vacío' })
    subtotalClassification: number;
    @IsOptional()
    @IsInt({ message: 'El número de estudiantes debe ser un número entero' })
    @Min(1, { message: 'El número de estudiantes debe ser mayor o igual a 1' })
    numberStudents?: number;
}