import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:"jwt"}),
    
    MongooseModule.forFeature([{ name: 'User', schema: User }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
