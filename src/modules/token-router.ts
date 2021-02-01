import { Router, Request, Response } from 'express';
import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import { appModels } from '../models';

const router = Router();

export default (bot: Telegraf<TelegrafContext>) => {
	router.get('/:token', async (req: Request, res: Response) => {
		try {
			const { token } = req.params;
			const { message } = req.query;
			console.log(token);
			const chat = await appModels.Chat.findOne({ token });
			if (!chat) {
				res.status(404).send('Chat not found');
				return;
			}
			if (message) {
				await bot.telegram.sendMessage(chat.chatId, (message + '').replace(/\\n/gmi, '\n'));
			}
			res.send(`<h1>${token}</h1>`);
		} catch (err) {
			console.log(err);
			if (err?.code === 403) {
				res.send(`<h1>Пользователь выключил бота</h1>`);
			} else {
				res.status(500).send('Error');
			}
		}
	});
	return router;
};
