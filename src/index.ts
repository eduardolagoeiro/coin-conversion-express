import * as dotenv from 'dotenv';
import server from './server';

dotenv.config();

server().catch(console.error);
