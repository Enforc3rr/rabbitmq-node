const amqp = require("amqplib");

connectRabbitMq();

async function connectRabbitMq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        //{ queue: 'queue', messageCount: 0, consumerCount: 1 }
        const result = await channel.assertQueue("queue"); //makes sure our queue exists on the server , if it doesn't exist then it creates one for us.
        /*
        {
  fields: {
    consumerTag: 'amq.ctag-6Ol1bPyWO3U-N24inCV_3A',
    deliveryTag: 5254,
    redelivered: false,
    exchange: '',
    routingKey: 'queue'
  },
  properties: {
    contentType: undefined,
    contentEncoding: undefined,
    headers: {},
    deliveryMode: undefined,
    priority: undefined,
    correlationId: undefined,
    replyTo: undefined,
    expiration: undefined,
    messageId: undefined,
    timestamp: undefined,
    type: undefined,
    userId: undefined,
    appId: undefined,
    clusterId: undefined
  },
  content: <Buffer 7b 22 6e 75 6d 62 65 72 22 3a 35 32 35 32 7d>
}
         */
        // channel.consume("queue",msg =>{
        //     console.log(msg.content.toString());
        //     channel.ack(msg);
        // },{noAck : true}); it automatically acknowledges the message. [useful in case of messages and not tasks]

        channel.consume("queue",msg =>{
            console.log(msg.content.toString());
            channel.ack(msg);
        });
    }catch (e) {
        console.error(e);
    }
}
