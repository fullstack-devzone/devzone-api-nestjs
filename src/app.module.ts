import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { DatabaseModule } from './database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import ConfigLoader from './ConfigLoader';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['.env'],
      load: [ConfigLoader],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    LinksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
