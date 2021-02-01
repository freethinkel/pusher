import { appModels } from '../models';
import nanoid from 'nanoid';
import { Chat } from '../models/Chat';

export class StartService {
	async findOrCreateChat(chatId: number): Promise<[boolean, Chat]> {
		let isCreate = false;
		let chat = await appModels.Chat.findOne({ chatId });
		if (!chat) {
			chat = appModels.Chat.create({ chatId, token: nanoid.nanoid(16) });
			await chat.save();
			isCreate = true;
		}
		return [isCreate, chat];
	}
}
