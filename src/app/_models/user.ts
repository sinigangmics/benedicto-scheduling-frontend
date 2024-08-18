import { Role } from './role';
import { Status } from './status';

export class User {
  user?: {
    id?: string;
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    role?: Role;
    status?: Status;
    token?: string;
  };
  access_token?: string;
}
