import Telegraf from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN ?? '');
bot.start((ctx) => {
	console.log(ctx.message);
	ctx.reply('Привет');
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) =>
	ctx.replyWithPhoto({
		url: 'https://source.unsplash.com/random',
		filename: 'photo',
	})
);
bot.launch();
