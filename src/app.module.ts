import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './domain/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService
          .get<string>('MONGO_DB_URL')
          .replace('<PASSWORD>', configService.get('MONGO_DB_PASSWORD')),
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
