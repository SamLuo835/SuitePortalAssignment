import { Injectable } from '@nestjs/common';
import { AdminLoginRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

export interface AdminDB extends AdminLoginRequest {
  id: string;
  submittedAt: Date;
}

export interface MaintenanceRequestData {
    admins: AdminDB[];
}

const adapter = new FileSync<AdminLoginRequest>('./db/admin.json')
const db = low(adapter)

db.defaults({ admins: [] }).write();

@Injectable()
export class AdminRequestDao {

  private get collection(): any {
    return db.get('admins');
  }

  constructor() {
    //
  }

  async getAdmin(request: AdminLoginRequest): Promise<AdminDB> {
    return await this.collection.find(request).value();
  }
}
