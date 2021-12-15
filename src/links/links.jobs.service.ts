import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LinksJobsService {
    private readonly logger = new Logger(LinksJobsService.name);

    @Cron(CronExpression.EVERY_30_SECONDS)
    //@Cron('45 * * * * *')
    handleCron() {
        this.logger.debug('Called every 30 seconds');
    }
}