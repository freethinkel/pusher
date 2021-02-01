import express from 'express';
import Telegraf from 'telegraf';
import {config} from './src/helpers/config';
import appDb from './src/models';
import {startModule} from "./src/modules/start";
import tokenRouter from './src/modules/token-router';

const main = async () => {
    await appDb.connect();
    const bot = new Telegraf(config.botToken || '');
    bot.start(startModule);
    await bot.launch();

    const app = express();
    app.use('/send', tokenRouter(bot));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`HTTP server listening on ${PORT}`);
    });
};

main().then(_ => {
});
