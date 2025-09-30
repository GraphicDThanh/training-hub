import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message, User } from './model';

export class ChatServer {
  public static readonly PORT:number = 8080;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private users: User[] = [];
  private messages: Message[] = [];

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private emitEvent(nameEvent, data): void {
    this.io.emit(nameEvent, JSON.stringify(data))
  }

  private emitEventBroadcast(client, nameEvent, data): void {
    client.broadcast.emit(nameEvent, JSON.stringify(data))
  }

  private emitEventToSenderOnly(client, nameEvent, data): void {
    client.emit(nameEvent, JSON.stringify(data))
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port: ', this.port);
    });

    this.io.on('connect', client => {
      console.log('Connected client on port: ', this.port);
      let id;

      client.on('addUser', (user) => {
        if (user && user.id) {
          if(!this.users || !this.users.length || !this.isExistUser(user)) {
            id = user.id;
            this.users.push(user);
            this.emitEventBroadcast(client, 'userConnected', user);
          } else {
            this.emitEventBroadcast(client, 'existUser', user);
          }
        }
      });

      client.on('getUser', () => {
        this.emitEventBroadcast(client, 'getUser', this.users);
      });

      client.on('updateUser', (user) => {
        this.users = this.users.map(userObj => (userObj.id === user.id) ? user : userObj);
      });

      client.on('removeUser', (id) => {
        this.users = this.users.filter(user => (user.id !== id));
        this.emitEventBroadcast(client, 'userDisconnected', this.users);
      });

      client.on('addMessage', (message) => {
        if (message && message.author && message.author.id) {
          this.messages.push(message);
          this.emitEventBroadcast(client, 'addMessage', message);
        }

      });

      client.on('getMessage', () => {
        // set time out to test loading
        this.emitEventBroadcast(client, 'getMessage', this.messages);
      });

      client.on('disconnect', () => {
        console.log('Disconnected client id: ', id);
        this.users = this.users.filter(user => (user.id !== id));

        // clear message if all user left room
        if (!this.users.length) {
          this.messages = [];
        }
        this.emitEventBroadcast(client, 'userDisconnected', this.users);
        id = null;
      });
    });

  }

  public getApp(): express.Application {
    return this.app;
  }

  private isExistUser(user) {
    if (!this.users || !this.users.length) return false;
    let isExist = false;

    this.users.forEach(userObj => {
      if (userObj.id === user.id) {
        isExist = true;
        return;
      }
    });

    return isExist;
  }
}