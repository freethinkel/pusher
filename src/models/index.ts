import { Connection, createConnection } from 'typeorm';
import { config } from '../helpers/config';
import { Chat } from './Chat';

export const appModels = {
	Chat,
};
class AppModels {
	connection!: Connection;

	constructor() {}

	async migration() {}

	async connect() {
		this.connection = await createConnection({
			type: 'mongodb',
			host: config.dbHost,
			database: config.dbDatabase,
			username: config.dbUsername,
			password: config.dbPassword,
			// port: +(config.dbPort || 29388),
			entities: Object.values(appModels),
			logging: !config.prod,
			useNewUrlParser: true,
			w: 'majority',
			// synchronize: true,
			useUnifiedTopology: true,
			url: `mongodb+srv://${config.dbUsername}:${config.dbPassword}@${config.dbHost}/${config.dbDatabase}?retryWrites=true&w=majority`
		});
		Object.values(appModels).forEach((m) => {
			if ((m as any).useConnection) {
				(m as any).useConnection(this.connection);
			}
		});
		console.log('db connected');
	}
}

export default new AppModels();
