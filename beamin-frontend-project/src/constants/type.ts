export const TokenType = {
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
} as const;

export const Role = {
  User: 'User',
  Admin: 'Admin',
} as const;

export const RoleValues = [Role.User, Role.Admin] as const;
