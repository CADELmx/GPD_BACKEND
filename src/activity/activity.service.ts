import { Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ActivityService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly prismaErrorHandler: PrismaErrorHandler,
    ) { }
    
}
