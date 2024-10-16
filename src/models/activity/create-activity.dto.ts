import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateActivityDto {
    @IsInt({ message: 'El ID de Programa educativo debe ser un número entero' })
    @Min(1, { message: 'El ID de Programa educativo debe ser mayor o igual a 1' })
    educationalProgramId?: number;
    @IsInt({ message: 'El ID de Plantilla parcial debe ser un número entero' })
    @Min(1, { message: 'El ID de Plantilla parcial debe ser mayor o igual a 1' })
    partialTemplateId: number;
    @IsString({ message: 'El distribución de actividades tiene que ser un texto' })
    activityDistribution: string;
    @IsOptional()
    @IsString({ message: 'El tipo de gestión tiene que ser un texto' })
    managmentType?: string;
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
    weeklyHours: number;
    @IsInt({ message: 'El subtotal por clasificación debe ser un número entero' })
    subtotalClassification: number;
    @IsOptional()
    @IsInt({ message: 'El número de estudiantes debe ser un número entero' })
    @Min(1, { message: 'El número de estudiantes debe ser mayor o igual a 1' })
    numberStudents?: number;
}