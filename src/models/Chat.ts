import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity({
	name: 'chats',
})
export class Chat extends BaseEntity {
	@ObjectIdColumn()
	id!: ObjectID;

	@Column({ unique: true })
	chatId!: number;

	@Column({ unique: true })
	token!: string;
}
