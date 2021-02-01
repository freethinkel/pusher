import { TelegrafContext } from 'telegraf/typings/context';
import { config } from '../helpers/config';
import { StartService } from '../services/start.service';

export const startModule = async (ctx: TelegrafContext) => {
	const startService = new StartService();
	if (ctx.message) {
		const [isCreate, chat] = await startService.findOrCreateChat(
			ctx.message?.chat.id
		);
		if (isCreate) {
			await ctx.replyWithMarkdown(`Привет!`);
			await ctx.replyWithMarkdown(
				`Бот умеет присылать сообщения посредством \`webhook\``
			);
			await ctx.replyWithMarkdown(
				`Для того чтобы послать сообщение у вас есть собственный уникальный токен: \n*${chat.token}*`
			);
			await ctx.reply(
				`${config.domainURL}/send/${chat.token}?message=Привет сообщения`
			);
		} else {
			await ctx.reply(`${config.domainURL}/send/${chat.token}?message=Пример сообщения`);
		}
	}
};
