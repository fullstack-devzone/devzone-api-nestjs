import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Link } from './entities/link.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        entities: [Role, User, Tag, Link],
        synchronize: configService.get('DATABASE_MIGRATION_ENABLED'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
