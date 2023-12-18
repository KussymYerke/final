import { Client, Account, Databases, Storage, Avatars } from "appwrite";


export const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('658097311129924d3a73');


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);