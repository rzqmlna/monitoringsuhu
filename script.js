var jsonObj = eval(json)
var json = ""
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = "ws://broker.emqx.io:8083/mqtt"
const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}

console.log('connecting mqtt client')
document.getElementById("status").innerHTML='Connecting';
const client = mqtt.connect(host, options);
const der = "C"

client.on('error', function (err) {
  console.log(err)
  client.end()
})

client.on('connect', function () {
  console.log('client connected:' + clientId)
  document.getElementById("status").innerHTML = "Connected";
  client.subscribe("Kaizen/#");

})

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
  if (topic == "Kaizen/planta/suhu") {
    json = JSON.parse(message)
    console.log(json.values[0].v)
    document.getElementById("motor").innerHTML = json.values[0].v;
    document.getElementById("subs").innerHTML = json.values[0].id;
    
}})

client.on('close', function () {
  document.getElementById("status").innerHTML = "Disconeccted"
  console.log(clientId + ' disconnected')
})