<template>
  <div>
    <div class="text-grey-6 text-center q-mt-md" style="font-size: 1.3rem;">{{descriptions[currentSettings.mode]}}</div>
    <div class="row">
      <q-btn-toggle class='q-mt-md col-12' rounded toggle-text-color="grey-9" text-color="grey-6" flat v-model="currentSettings.mode" :options="modeOptions"/>
      <q-input outlined hide-bottom-space class="col-12" v-if="currentSettings.mode === IFRAME_MODE_INTEGRATION" color="grey-9" v-model="currentSettings.link" label="Iframe link"/>
      <div class="frame__items-wrapper col-12 relative-position q-mb-sm q-mt-lg" v-if="currentSettings.mode === IFRAME_MODE_INTEGRATION">
        <q-list bordered>
          <q-btn color="grey-9" style="top: -20px; right: 8px; position: absolute; z-index: 1130;" class="col-12" fab-mini @click="addItem" icon="mdi-plus"/>
          <q-item-label class="q-py-md q-px-sm" :class="{'text-red-6': !currentSettings.items.length}">Post message commands{{currentSettings.items.length ? '' : ' are empty'}}</q-item-label>
          <q-expansion-item
            v-for="(item, index) in currentSettings.items"
            :key="`${index}${item.value}`"
            group="frame-items"
            :header-class="[`bg-${checkUniqueTopic(index) ? 'grey-4' : 'red-2'}`]"
            expand-icon="mdi-settings"
            default-opened
          >
            <template slot="header">
              <q-item-section>{{item.label || item.topic.topicFilter}}</q-item-section>
              <q-item-section side>
                <q-btn flat color="red-6" round dense @click="removeItem(index)" icon="mdi-delete"/>
              </q-item-section>
            </template>
            <div class="row q-pa-sm">
              <q-input outlined hide-bottom-space class="col-12 q-mb-sm" color="grey-9" v-model="item.label" label="Label"/>
              <topic class="col-12 q-mb-sm" v-model="item.topic" :label="item.label" @input="setTopics" :board="board"/>
              <q-input outlined hide-bottom-space class="col-12" type="textarea" color="grey-9" v-model="item.template" label="Payload template" input-style="resize: none;"/>
              <div class="col-12 text-grey-6" style="font-size: .8rem">
                You can use variables in template: <span class="text-grey-10 cursor-pointer" @click="item.template += '<{topic}>'">&lt;{topic}&gt;</span> is a topic from payload packet, <span class="text-grey-10 cursor-pointer" @click="item.template += '<{payload}>'">&lt;{payload}&gt;</span> is a stringified payload of packet, <span class="text-grey-8">&lt;%payload.name%&gt;</span> is a JSON path to value in payload, if payload is object.
              </div>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="col-12 text-grey-6 q-mt-xs" style="font-size: .8rem">
        <span class="text-grey-9 cursor-pointer" @click="exampleSettingsApply">Example</span>
        <span class="text-red"> (will clear all your settings)</span>
      </div>
      <div class="q-mt-sm col-12">
        <q-toggle color="grey-9" v-model="currentSettings.isNeedTime" label="Show last update time"/>
      </div>
    </div>
  </div>
</template>

<script>
import { IFRAME_MODE_INTEGRATION, IFRAME_MODE_SHOW } from './constants'
import Topic from '../Topic'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
export default {
  name: 'FrameSchema',
  props: ['widget', 'board'],
  data () {
    let defaultSettings = {
        height: 6,
        width: 3,
        maxTopicsLength: 0,
        minWidth: 3,
        minHeight: 3,
        mode: 0,
        template: '',
        items: [],
        topics: [],
        link: 'https://flespi.io/mapview',
        isNeedTime: true
      },
      defaultItem = {
        label: 'New item',
        template: '',
        topic: {
          topicFilter: '',
          payloadType: 0,
          payloadField: ''
        }
      }
    return {
      defaultSettings,
      defaultItem,
      currentSettings: Object.assign({}, defaultSettings, this.widget.settings),
      IFRAME_MODE_INTEGRATION,
      IFRAME_MODE_SHOW,
      modeOptions: [
        { label: 'Integration mode', value: IFRAME_MODE_INTEGRATION },
        { label: 'Show mode', value: IFRAME_MODE_SHOW }
      ],
      descriptions: [
        'Payload will be posted to your iframe',
        'Link as payload expected!'
      ]
    }
  },
  methods: {
    exampleSettingsApply () {
      this.$set(this.currentSettings, 'link', 'https://flespi.io/mapview')
      this.$set(this.currentSettings, 'items', [
        {
          label: 'Map item',
          template: `MapView|cmd:{"addmarkers": [[<%position.latitude%>, <%position.longitude%>]], "clear": "all"}`,
          topic: {
            topicFilter: 'flespi/message/gw/devices/+',
            payloadType: 1,
            payloadField: ''
          }
        }
      ])
      this.$set(this.currentSettings, 'topics', [
        {
          topicFilter: 'flespi/message/gw/devices/+',
          payloadType: 1,
          payloadField: ''
        }
      ])
    },
    addItem () {
      this.currentSettings.items.push(cloneDeep(this.defaultItem))
    },
    removeItem (itemIndex) {
      this.$delete(this.currentSettings.items, itemIndex)
    },
    setTopics () {
      this.$set(this.currentSettings, 'topics', this.currentSettings.items.map(item => item.topic))
    },
    checkUniqueTopic (itemIndex) {
      let item = this.currentSettings.items[itemIndex],
        sameTopicsIndexes = this.currentSettings.items.reduce((res, currItem, index) => {
          if (currItem.topic.topicFilter === item.topic.topicFilter) {
            res.push(index)
          }
          return res
        }, [])
      return item.topic.topicFilter &&
        sameTopicsIndexes.indexOf(itemIndex) === 0
    },
    validate () {
      return (
        this.currentSettings.mode === IFRAME_MODE_INTEGRATION && this.currentSettings.items.length && this.currentSettings.items.reduce((res, _, index) => {
          return res && this.checkUniqueTopic(index)
        }, true)
      ) || (
        this.currentSettings.mode === IFRAME_MODE_SHOW
      )
    }
  },
  created () {
    this.$emit('update', this.currentSettings)
  },
  watch: {
    currentSettings: {
      deep: true,
      handler (val, old) {
        this.$emit('validate', this.validate())
        if (isEqual(val, old)) { return false }
        this.$emit('update', this.currentSettings)
      }
    },
    'currentSettings.mode' (mode) {
      if (mode === IFRAME_MODE_INTEGRATION) {
        this.currentSettings.maxTopicsLength = 0
        this.widget.dataTopics = []
      } else {
        this.currentSettings.maxTopicsLength = 1
        this.currentSettings.topics = []
        this.currentSettings.items = []
      }
    }
  },
  components: { Topic }
}
</script>
