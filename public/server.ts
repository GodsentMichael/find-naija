import { createServer, Server } from 'http';
import app from './app';
const PORT = process.env.PORT || 5000;

const server: Server = createServer(app);
server.listen(PORT, () => {
	console.log(`My server is listening on port ${PORT}`);
});
