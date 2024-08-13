import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import {
  AdminLoginRequest,
  AdminLoginResponse,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';
import { AdminRequestService } from './admin-request.service';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

@Controller('admin-requests')
export class AdminRequestController {
  constructor(private readonly adminRequestService: AdminRequestService) {
    //
  }

  @Post('/admin-login')
  public async adminLogin(
    @Body() request: AdminLoginRequest
  ): Promise<AdminLoginResponse> {
    if (!request?.username) {
      throw new BadRequestException('Must provide username');
    }
    if (!request?.password) {
      throw new BadRequestException('Must provide password');
    }
    const admin = await this.adminRequestService.getAdminRequest(request);
    if (!admin) {
      throw new BadRequestException('Invalid username or password');
    }
    // Implement JWT token generation
    const token = jwt.sign({ adminId: admin.id }, SECRET_KEY, {
      expiresIn: '1h',
    });
    return { token };
  }
}
