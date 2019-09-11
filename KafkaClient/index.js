
// Producer of this application generates an XML topic
//consumer recieves the XML and parses it into a JSON format

const { Kafka } = require('kafkajs')
var xmlparser = require('xml2json');


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

var myxml = `<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`;

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: myxml },
    ],
  })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        status : "success",  
        partition,
        offset: message.offset,
        value: JSON.stringify(xmlparser.toJson(message.value, {reversible: true})),
      })
    },
  })
}

run().catch(console.error)