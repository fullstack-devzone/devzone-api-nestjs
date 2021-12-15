import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Link} from "../entities/link.entity";
import {LinksJobsService} from "./links.jobs.service";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";

@Module({
  imports:[AuthModule, UsersModule, TypeOrmModule.forFeature([Link])],
  controllers: [LinksController],
  providers: [LinksService, LinksJobsService]
})
export class LinksModule {}
