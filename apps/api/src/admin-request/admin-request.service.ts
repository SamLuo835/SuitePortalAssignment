import { Injectable } from '@nestjs/common';
import { AdminLoginRequest } from '@suiteportal/api-interfaces';
import { AdminDB, AdminRequestDao } from './admin-request.dao';

@Injectable()
export class AdminRequestService {

  constructor(
    private readonly adminReqDao: AdminRequestDao,
  ) {
    //
  }

  async getAdminRequest(request: AdminLoginRequest): Promise<AdminDB> {
    return await this.adminReqDao.getAdmin(request);
  }
}
