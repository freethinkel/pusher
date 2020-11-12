import { BaseEntity, Entity } from 'typeorm';

@Entity({
	name: 'users',
})
export class User extends BaseEntity {}
