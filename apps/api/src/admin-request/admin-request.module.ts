import { Module } from '@nestjs/common';
import { AdminRequestController } from './admin-request.controller';
import { AdminRequestService } from './admin-request.service';
import { AdminRequestDao } from './admin-request.dao';


@Module({
  imports: [],
  controllers: [AdminRequestController],
  providers: [
    AdminRequestService,
    AdminRequestDao,
  ],
})
export class AdminRequestModule {
}
