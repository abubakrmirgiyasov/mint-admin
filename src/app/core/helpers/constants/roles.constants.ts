interface Role {
  all: string[];
  admin: string;
  buyer: string;
  seller: string;
}

export const Roles: Role = {
  all: ['buyer', 'admin', 'seller'],
  admin: 'admin',
  buyer: 'buyer',
  seller: 'seller',
};
