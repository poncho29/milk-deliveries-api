import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // Only development,
      ssl: process.env.SSL === 'true',
      extra: {
        ssl: process.env.SSL === 'true' ? { rejectUnauthorized: false } : null,
      },
    }),
    CommonModule,
    AuthModule,
    DeliveriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
