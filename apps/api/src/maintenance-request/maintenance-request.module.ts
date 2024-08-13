import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestDao } from './maintenance-request.dao';
import { MaintenanceRequestService } from './maintenance-request.service';
import { VerifyTokeMiddleware } from '../middle-wares/verify-token';

@Module({
  imports: [],
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService, MaintenanceRequestDao],
})
export class MaintenanceRequestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokeMiddleware).forRoutes(
      { path: 'maintenance-requests/:id', method: RequestMethod.PATCH },
      {
        path: 'maintenance-requests',
        method: RequestMethod.GET,
      },
      {
        path: 'maintenance-requests/closeRequest',
        method: RequestMethod.PATCH,
      }
    );
  }
}
