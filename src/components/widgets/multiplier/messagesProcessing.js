import setWith from 'lodash/setWith'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import Vue from 'vue'

function getMultiplierValueByPacket (packet, initValue, subscriptionTopic, widget) {
  let path = subscriptionTopic.split('/')
  let currentPath = packet.topic.split('/')
  let value = initValue
  let setPath = []
  path.forEach((pathItem, index) => {
    setPath.push(currentPath[index])
  })
  if (packet.payload.length) {
    let payload
    try {
      payload = JSON.parse(packet.payload.toString())
    } catch (e) {
      payload = packet.payload.toString()
    }
    if (setPath.length) {
      setWith(value, setPath, payload, Object)
    } else {
      value = payload
    }
  } else {
    if (setPath.length) {
      let path = setPath.slice(0, -1).join('.')
      let name = setPath.slice(-1)[0]
      let obj = path ? get(value, path, null) : value
      Vue.delete(obj, name)
    } else {
      value = null
    }
  }
  return value
}
export default function getMultiplierValue (packets, initValue, subscriptionTopic, widget) {
  if (!packets || subscriptionTopic !== widget.dataTopics[0].topicFilter) { return packets }
  let value = initValue ? cloneDeep(initValue) : {}
  packets.forEach((packet) => {
    value = getMultiplierValueByPacket(packet, value, subscriptionTopic, widget)
  })
  return value
}
