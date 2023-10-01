import { SetMetadata } from '@nestjs/common';

import { ValidRoles } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => {
  // Establecemos la metadata a obtener
  return SetMetadata(META_ROLES, args);
};
