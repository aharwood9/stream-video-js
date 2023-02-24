import { StreamChat } from 'stream-chat';
import dotenv from 'dotenv';
import { users } from '../data/users.js';

const usersWithoutToken = users.map(({ token: _, ...rest }) => rest);

dotenv.config();

const apiKey = process.env.VITE_STREAM_KEY;
const secret = process.env.VITE_STREAM_SECRET;

const client = StreamChat.getInstance(apiKey, secret);

console.log('Creating users...');
await client.upsertUsers(usersWithoutToken);

const channels = usersWithoutToken
  .flatMap((user, index) =>
  usersWithoutToken.map((nestedUser, nestedIndex) => {
      if (index >= nestedIndex) return null;
      return [user, nestedUser];
    }),
  )
  .filter(Boolean)
  .map(([firstUser, secondUser]) =>
    client.channel('messaging', {
      members: [firstUser.id, secondUser.id],
      created_by: firstUser,
    }),
  );

console.log('Initiating channels between two users...');

const c = await Promise.allSettled(channels.map((c) => c.create()));

console.log(c);

console.log('Finished initialization.');
