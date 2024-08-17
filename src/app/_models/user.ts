import { Role } from './role';
import { Status } from './status';

export class User {
  user?: {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
    status?: Status;
    token?: string;
  };
  access_token?: string;
}
