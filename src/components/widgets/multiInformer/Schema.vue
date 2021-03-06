<template>
  <div>
    <div class="row">
      <div class="multi-informer__items-wrapper col-12 relative-position q-mb-sm">
        <q-list bordered>
          <q-btn color="grey-9" style="top: -20px; right: 8px; position: absolute; z-index: 1130;" class="col-12" fab-mini @click="addItem" icon="mdi-plus"/>
          <q-item-label class="q-py-md q-px-sm" :class="{'text-red-6': !currentSettings.items.length}">Items{{currentSettings.items.length ? '' : ' are empty'}}</q-item-label>
          <q-expansion-item
            v-for="(item, index) in currentSettings.items"
            :key="`${index}${item.topic}`"
            group="singleselect-items"
            :header-class="[`bg-${!!item.topic.topicFilter ? 'grey-4' : 'red-2'}`]"
            expand-icon="mdi-settings"
            default-opened
          >
            <template slot="header">
              <q-item-section side>
                <div>
                  <q-btn :disabled="index === 0" round dense flat class="col-1" @click.stop="upItem(index)" icon="mdi-arrow-up"/>
                  <q-btn :disabled="index === (currentSettings.items.length - 1)" round dense flat class="col-1" @click.stop="downItem(index)" icon="mdi-arrow-down"/>
                </div>
              </q-item-section>
              <q-item-section>{{item.topic.topicFilter || `item ${index + 1}`}}</q-item-section>
              <q-item-section side>
                <q-btn flat color="red-6" round dense @click="removeItem(index)" icon="mdi-delete"/>
              </q-item-section>
            </template>
            <div class="row q-pa-sm">
              <topic class="col-12 q-mb-sm" v-model="item.topic" @input="updateTopics" :board="board"/>
              <div class="col-6 q-mb-sm">
                <q-input outlined hide-bottom-space class="q-mr-sm" color="grey-9" v-model="item.prefix" label="Prefix"/>
              </div>
              <div class="col-6">
                <q-input outlined hide-bottom-space class="q-ml-sm" color="grey-9" v-model="item.postfix" label="Postfix"/>
              </div>
              <q-input outlined hide-bottom-space class="col-8 q-pr-xs q-mb-sm" color="grey-9" v-model="item.math" label="Math expression" placeholder="%value%"/>
              <q-select outlined hide-bottom-space class="col-4 q-mb-sm" color="grey-9" v-model="item.valueFormat" :options="formatOptions" emit-value map-options label="Format value as"/>
              <q-input outlined hide-bottom-space class="col-12 q-mb-xs" color="grey-9" v-if="item.valueFormat === constants.WIDGET_VALUE_FORMAT_DATE" v-model="item.dateFormat" label="Datetime format" placeholder="DD/MM/YYYY HH:mm:ss.SSS"/>
              <div class="col-12 text-grey-7 q-px-sm q-mb-sm" style="font-size: 12px; line-height: 1;">You can use math expressions to calculate the final value. Example: (%value% * 1000) / 1024, where %value% is the payload from your subscription.</div>
            </div>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="q-mt-sm col-12">
        <q-toggle color="grey-9" v-model="currentSettings.isNeedTime" label="Show last update time"/>
      </div>
    </div>
  </div>
</template>

<script>
import {
  WIDGET_VALUE_FORMAT_STRING,
  WIDGET_VALUE_FORMAT_HUMAN_READABLE_SIZE,
  WIDGET_VALUE_FORMAT_DATE,
  WIDGET_VALUE_FORMAT_PRE,
  WIDGET_VALUE_FORMAT_MARKDOWN,
  WIDGET_VALUE_FORMAT_JSON,
  WIDGET_VALUE_FORMAT_DURATION
} from '../../../constants'
import validateTopic from '../../../mixins/validateTopic.js'
import Topic from '../Topic'
import isEqual from 'lodash/isEqual'
export default {
  name: 'MultiInformerSchema',
  props: ['widget', 'board'],
  data () {
    let defaultSettings = {
      items: [],
      topics: [],
      height: 2,
      width: 2,
      minWidth: 1,
      minHeight: 2,
      maxTopicsLength: 0,
      isNeedTime: true
    }
    let defaultItem = {
      topic: {
        topicFilter: '',
        payloadType: 0,
        payloadField: ''
      },
      math: '',
      valueFormat: 0,
      prefix: '',
      postfix: ''
    }
    return {
      defaultSettings,
      defaultItem,
      constants: {
        WIDGET_VALUE_FORMAT_STRING,
        WIDGET_VALUE_FORMAT_HUMAN_READABLE_SIZE,
        WIDGET_VALUE_FORMAT_DATE,
        WIDGET_VALUE_FORMAT_PRE,
        WIDGET_VALUE_FORMAT_MARKDOWN,
        WIDGET_VALUE_FORMAT_JSON,
        WIDGET_VALUE_FORMAT_DURATION
      },
      currentItem: Object.assign({}, defaultItem),
      currentSettings: Object.assign({}, defaultSettings, this.widget.settings),
      formatOptions: [
        { label: 'String', value: WIDGET_VALUE_FORMAT_STRING },
        { label: 'Human readable size, B', value: WIDGET_VALUE_FORMAT_HUMAN_READABLE_SIZE },
        { label: 'Datetime, s', value: WIDGET_VALUE_FORMAT_DATE },
        { label: 'Duration, s', value: WIDGET_VALUE_FORMAT_DURATION },
        { label: 'Preformated', value: WIDGET_VALUE_FORMAT_PRE },
        { label: 'Markdown', value: WIDGET_VALUE_FORMAT_MARKDOWN },
        { label: 'JSON', value: WIDGET_VALUE_FORMAT_JSON }
      ],
      defaultTopic: {
        topicFilter: '',
        payloadType: 0,
        payloadField: ''
      }
    }
  },
  methods: {
    addItem () {
      this.currentSettings.items.push(this.currentItem)
      this.currentItem = Object.assign({}, this.defaultItem)
    },
    removeItem (itemIndex) {
      this.$delete(this.currentSettings.items, itemIndex)
    },
    upItem (itemIndex) {
      let movedItem = this.currentSettings.items.splice(itemIndex, 1)[0]
      this.currentSettings.items.splice(itemIndex - 1, 0, movedItem)
    },
    downItem (itemIndex) {
      let movedItem = this.currentSettings.items.splice(itemIndex, 1)[0]
      this.currentSettings.items.splice(itemIndex + 1, 0, movedItem)
    },
    updateTopics () {
      this.$set(this.currentSettings, 'topics', this.currentSettings.items.map(item => item.topic))
    },
    validate () {
      return true
    }
  },
  created () {
    this.$emit('update', this.currentSettings)
  },
  mixins: [validateTopic],
  watch: {
    widget: {
      deep: true,
      handler (val, old) {
        this.$emit('validate', this.validate())
        if (isEqual(val, old)) { return false }
        this.$emit('update', val)
      }
    }
  },
  components: { Topic }
}
</script>
