import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EncryptionService } from './encryption/encryption.service';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [AuthModule, EncryptionModule],
  exports: [AuthModule, EncryptionModule],
  providers: [EncryptionService],
})
export class SharedModule {}
