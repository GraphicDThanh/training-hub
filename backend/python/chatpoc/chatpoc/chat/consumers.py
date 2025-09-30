import json
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.utils import get_room_or_error


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print('CHANNEL NAME: ', self.channel_name)

        # Check if user anonymous
        if self.scope['user'].is_anonymous:
            self.close()
        else:
            print('websocket path: ', self.scope['path'])
            print('room id: ', self.scope['url_route']['kwargs']['room_id'])

            # The logged-in user is in our scope thanks to the authentication ASGI middleware
            room_id = self.scope['url_route']['kwargs']['room_id']

            # Check if room_id existed in database
            room = await get_room_or_error(room_id, self.scope["user"])
            self.room_id = str(room.id)

            # Join room group
            await self.channel_layer.group_add(
                self.room_id,
                self.channel_name,
            )

            await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_id,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_id,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
