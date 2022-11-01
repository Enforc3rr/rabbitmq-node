const amqp = require("amqplib");
const message = {number : process.argv[2]};

connectRabbitMq();

async function connectRabbitMq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("queue"); //makes sure our queue exists on the server , if it doesn't exist then it creates one for us.

        for(let i = 0 ; i < 100000 ; i++)
            channel.sendToQueue("queue",Buffer.from(JSON.stringify({number : i})));

        console.log(`Message Sent : ${message.number}`);


    }catch (e) {
        console.error(e);
    }
}
