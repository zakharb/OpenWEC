"""
    MicroAPI
    Routers for price-service
    Copyright (C) 2022

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Author:
        Bengart Zakhar

    Description:
        Routers for operations with API
"""

from fastapi import APIRouter, HTTPException
from asyncio_mqtt import Client
import ssl
import asyncio
from app.api.models import Message

router = APIRouter()

import time
import paho.mqtt.client as paho
from paho import mqtt
import aiomqtt

async def send_message(data):
    MQTT_USER = 'mqtt_user'
    MQTT_PSWD = 'mqtt_useR43'
    MQTT_URL = '7552e0d2600843c0a19294813d03310e.s1.eu.hivemq.cloud'
    MQTT_PORT = '8883'
    
    loop = asyncio.get_event_loop()
    c = aiomqtt.Client(loop)
    c.loop_start()  # See "About that loop..." below.

    connected = asyncio.Event()
    def on_connect(client, userdata, flags, rc):
        connected.set()
    c.on_connect = on_connect
    c.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
    # set username and password
    c.username_pw_set(MQTT_USER, MQTT_PSWD)
    # connect to HiveMQ Cloud on port 8883 (default for MQTT)
    await c.connect(MQTT_URL, 8883)
    await connected.wait()
    print("Connected!")

    subscribed = asyncio.Event()
    def on_subscribe(client, userdata, mid, granted_qos):
        subscribed.set()
    c.on_subscribe = on_subscribe

    c.subscribe("my/test/path")
    await subscribed.wait()
    print("Subscribed to my/test/path")

    def on_message(client, userdata, message):
        print("Got message:", message.topic, message.payload)
    c.on_message = on_message

    message_info = c.publish("my/test/path", "Hello, world")
    await message_info.wait_for_publish()
    print("Message published!")

    await asyncio.sleep(1)
    print("Disconnecting...")

    disconnected = asyncio.Event()
    def on_disconnect(client, userdata, rc):
        disconnected.set()
    c.on_disconnect = on_disconnect

    c.disconnect()
    await disconnected.wait()
    print("Disconnected")

    await c.loop_stop()
    print("MQTT loop stopped!")

    """

    # setting callbacks for different events to see if it works, print the message etc.
    def on_connect(client, userdata, flags, rc, properties=None):
        print("CONNACK received with code %s." % rc)

    # with this callback you can see if your publish was successful
    def on_publish(client, userdata, mid, properties=None):
        print("mid: " + str(mid))

    # print which topic was subscribed to
    def on_subscribe(client, userdata, mid, granted_qos, properties=None):
        print("Subscribed: " + str(mid) + " " + str(granted_qos))

    # print message, useful for checking if it was successful
    def on_message(client, userdata, msg):
        print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

    # using MQTT version 5 here, for 3.1.1: MQTTv311, 3.1: MQTTv31
    # userdata is user defined data of any type, updated by user_data_set()
    # client_id is the given name of the client
    client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)
    client.on_connect = on_connect

    # enable TLS for secure connection
    client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
    # set username and password
    client.username_pw_set(MQTT_USER, MQTT_PSWD)
    # connect to HiveMQ Cloud on port 8883 (default for MQTT)
    client.connect(MQTT_URL, 8883)

    # setting callbacks, use separate functions like above for better visibility
    client.on_subscribe = on_subscribe
    client.on_message = on_message
    client.on_publish = on_publish

    # subscribe to all topics of encyclopedia by using the wildcard "#"
    client.subscribe("encyclopedia/#", qos=1)

    # a single publish, this can also be done in loops, etc.
    client.publish("encyclopedia/temperature", payload="hot", qos=1)

    # loop_forever for simplicity, here you need to stop the loop manually
    # you can also use loop_start and loop_stop
    client.loop_forever()
    """

async def send_message2(data):
    print(data)
    MQTT_USER = 'mqtt_user'
    MQTT_PSWD = 'mqtt_useR4'
    MQTT_URL = '7552e0d2600843c0a19294813d03310e.s1.eu.hivemq.cloud'
    MQTT_PORT = '8883'
    async with Client(
        MQTT_URL,
        username=MQTT_USER,
        password=MQTT_PSWD,
        tls_context=ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT, verify=False),
        port=int(MQTT_PORT)
        ) as client:
        message = "10%"
        await client.publish(
                "floors/bed_room/humidity",
                 payload=message.encode()
              )

@router.get('/')
async def put_message(source: str,
                      message: str, 
                      log_name: str): 

    data = {
        "source": source,
        "message": message,
        "log_name": log_name
    }
    await send_message(data)
    return '200'
