<template>
  <q-dialog v-model='status' @hide="closeHandler" no-esc-dismiss no-backdrop-dismiss>
    <div :style="{ width: $q.platform.is.mobile ? 'calc(100% - 40px)' : '50vw' }" class="bg-white">
      <q-toolbar class="bg-grey-9 text-white">
        <q-toolbar-title>
          Widget
        </q-toolbar-title>
      </q-toolbar>
      <div :style="{ height: $q.platform.is.mobile ? 'calc(100% - 100px)' : '50vh' }" class="scroll q-pa-md">
        <q-input outlined hide-bottom-space color="grey-9 q-mb-sm" v-model="currentSettings.name" label="Name"/>
        <q-select outlined hide-bottom-space color="grey-9  q-mb-sm" @input="typeChangeHandler" :value="currentSettings.type" :options="typeOptions" emit-value map-options label="Type">
          <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
            <q-item-section avatar>
              <q-icon :name="scope.opt.rightIcon" />
            </q-item-section>
          </q-item>
        </template>
        </q-select>
        <div class="color-palette q-pa-sm rounded-borders q-mb-lg">
          <div class="text-grey-9 q-pb-sm color-palette__label">Color</div>
          <div class="row color-palette__wrapper">
            <span
              v-for="color in colors"
              :key="color"
              :class="[`bg-${color}`]"
              class="q-mr-sm cursor-pointer color-palette__item"
              @click="setColor(color)"
            >
              <q-icon class="item__icon" size="1.4rem" v-if="color === currentSettings.color" name="mdi-check" color="white"/>
            </span>
          </div>
        </div>
        <q-list class="relative-position q-mb-sm" v-if="currentSettings.settings.maxTopicsLength !== 0" bordered>
          <q-btn
            color="grey-9"
            style="top: -20px; right: 8px; position: absolute; z-index: 1130;"
            class="col-12"
            fab-mini
            @click="addTopicHandler"
            icon="mdi-plus"
            v-if="!(this.currentSettings.settings.maxTopicsLength && this.currentSettings.dataTopics.length >= this.currentSettings.settings.maxTopicsLength) || this.currentSettings.settings.maxTopicsLength === undefined"
          />
          <q-item-label class="q-py-md q-px-sm" :class="{'text-red-6': !currentSettings.dataTopics.length}">Topics{{currentSettings.dataTopics.length ? '' : ' are empty'}}</q-item-label>
          <q-expansion-item
            v-for="(topic, index) in currentSettings.dataTopics"
            :key="index"
            :header-class="[`bg-${topicsHighlight[index]}`]"
            expand-icon="mdi-settings"
            default-opened
          >
            <template slot="header">
              <q-item-section>{{topic.topicTemplate || 'Empty'}}</q-item-section>
              <q-item-section side>
                <q-btn flat color="red-6" round dense @click="removeTopicHandler(index)" icon="mdi-delete"/>
              </q-item-section>
            </template>
            <topic v-model="currentSettings.dataTopics[index]" :board="board" class="q-pa-sm"/>
          </q-expansion-item>
        </q-list>
        <component
          :is="currentSettings.type"
          :widget="currentSettings"
          :board="board"
          @update="updateSettingsHandler"
          @validate="validateSchemas"
        />
      </div>
      <q-toolbar class="bg-grey-9 text-white">
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn flat dense class="q-mr-sm" @click="closeHandler">Close</q-btn>
        <q-btn flat dense :disable="!validateCurrentSettings || !isValideSchema" @click="saveSettingsHandler">{{saveButtonLabels[mode]}}</q-btn>
      </q-toolbar>
    </div>
  </q-dialog>
</template>

<style lang="stylus">
  .color-palette
    border 1px solid $grey-5
    .color-palette__label
      font-size .75rem
    .color-palette__wrapper
      .color-palette__item
        position relative
        height 20px
        width 20px
        padding 3px
        border-radius 50%
        .item__icon
          position absolute
          top 0
          left 0
          height 20px
          width 20px
</style>

<script>
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'
import Vue from 'vue'
import { WIDGET_STATUS_DISABLED, WIDGET_MODE_EDIT, WIDGET_MODE_ADD, WIDGET_MODE_DUPLICATE } from '../../constants'
import validateTopic from '../../mixins/validateTopic.js'
import Topic from './Topic'
import Switcher from './switcher/Schema'
import Informer from './informer/Schema'
import StaticInformer from './staticInformer/Schema'
import MultiInformer from './multiInformer/Schema'
import Clicker from './clicker/Schema'
import Radial from './radial/Schema'
import Linear from './linear/Schema'
import Frame from './frame/Schema'
import Singleselect from './singleselect/Schema'
import Multiplier from './multiplier/Schema'
import Complex from './complex/Schema'
import Slider from './slider/Schema'
import Color from './color/Schema'
import MapLocation from './mapLocation/Schema'
import MapRoute from './mapRoute/Schema'
import StatusIndicator from './statusIndicator/Schema'
import TextSender from './textSender/Schema'

export default {
  name: 'Settings',
  props: ['value', 'settings', 'mode', 'board'],
  data () {
    let defaultSettings = {
      name: 'New widget',
      color: 'grey',
      type: 'informer',
      topics: [],
      dataTopics: [], // topics for datasource
      settings: {},
      status: WIDGET_STATUS_DISABLED
    }
    return {
      defaultSettings,
      currentSettings: this.settings ? merge({}, defaultSettings, this.settings) : merge({}, defaultSettings),
      typeOptions: [
        { label: 'Text', value: 'informer', rightIcon: 'mdi-format-color-text' },
        { label: 'Multi text', value: 'multi-informer', rightIcon: 'mdi-card-text-outline' },
        { label: 'Static text', value: 'static-informer', rightIcon: 'mdi-format-text' },
        { label: 'Toggle', value: 'switcher', rightIcon: 'mdi-toggle-switch-outline' },
        { label: 'Button', value: 'clicker', rightIcon: 'mdi-send' },
        { label: 'Textarea', value: 'text-sender', rightIcon: 'mdi-text-subject' },
        { label: 'Slider', value: 'slider', rightIcon: 'mdi-ray-vertex' },
        { label: 'Color', value: 'color', rightIcon: 'mdi-palette' },
        { label: 'Map (Location)', value: 'map-location', rightIcon: 'mdi-map-marker-outline' },
        { label: 'Map (Route)', value: 'map-route', rightIcon: 'mdi-map-marker-distance' },
        { label: 'Status Indicator', value: 'status-indicator', rightIcon: 'mdi-lightbulb-outline' },
        { label: 'Radial gauge', value: 'radial', rightIcon: 'mdi-gauge' },
        { label: 'Linear gauge', value: 'linear', rightIcon: 'mdi-oil-temperature' },
        { label: 'Iframe', value: 'frame', rightIcon: 'mdi-window-maximize' },
        { label: 'Radio button', value: 'singleselect', rightIcon: 'mdi-radiobox-marked' },
        { label: 'Multiplier', value: 'multiplier', rightIcon: 'mdi-monitor-multiple' },
        { label: 'Complex', value: 'complex', rightIcon: 'mdi-card-bulleted-outline' }
      ],
      colors: ['grey', 'red', 'green', 'orange', 'blue', 'light-blue', 'purple', 'deep-orange', 'cyan', 'brown', 'blue-grey'],
      isValideSchema: true,
      defaultTopic: {
        topicFilter: '',
        payloadType: 0,
        payloadField: ''
      },
      saveButtonLabels: {
        [WIDGET_MODE_ADD]: 'Save',
        [WIDGET_MODE_EDIT]: 'Update',
        [WIDGET_MODE_DUPLICATE]: 'Clone'
      }
    }
  },
  computed: {
    validateCurrentSettings () {
      return !!this.isValidCurrentTopics &&
        this.currentSettings.topics.every(topicFilter => this.validateTopic(topicFilter))
    },
    status: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    },
    isValidCurrentTopics () {
      return (!!this.currentSettings.dataTopics.length || this.currentSettings.settings.maxTopicsLength === 0) &&
        this.currentSettings.dataTopics.every(topic => this.validateTopic(topic.topicFilter)) &&
        /* check topics don`t duplicating */
        this.currentSettings.dataTopics.every(topic => this.currentSettings.dataTopics.filter(topicCompare => topicCompare.topicFilter === topic.topicFilter).length === 1) &&
        (this.currentSettings.settings.maxTopicsLength === undefined || (this.currentSettings.settings.maxTopicsLength !== undefined && this.currentSettings.settings.maxTopicsLength === this.currentSettings.dataTopics.length))
    },
    topicsHighlight () {
      return this.currentSettings.dataTopics.reduce((colors, topic, index) => {
        if (this.validateTopic(topic.topicFilter) && this.checkUniqueTopic(topic.topicFilter, index)) {
          colors[index] = 'grey-4'
        } else {
          colors[index] = 'red-2'
        }
        return colors
      }, [])
    }
  },
  methods: {
    saveSettingsHandler () {
      this.$emit('save', this.currentSettings)
      this.closeHandler()
    },
    closeHandler () {
      this.$emit('input', false)
      this.$emit('hide')
      this.$nextTick(() => {
        this.currentSettings = merge({}, this.defaultSettings)
      })
    },
    typeChangeHandler (type) {
      if (this.currentSettings.type !== type) {
        this.currentSettings.settings = {}
        this.currentSettings.dataTopics = []
      }
      this.$set(this.currentSettings, 'type', type)
    },
    setColor (color) {
      Vue.set(this.currentSettings, 'color', color)
    },
    validateSchemas (status) {
      this.isValideSchema = status
    },
    addTopicHandler () {
      this.currentSettings.dataTopics.push(Object.assign({}, this.defaultTopic))
    },
    removeTopicHandler (index) {
      Vue.delete(this.currentSettings.dataTopics, index)
    },
    checkUniqueTopic (topic, index) {
      let isUnique = true
      this.currentSettings.dataTopics.map(topic => topic.topicFilter).some((currentTopic, currentTopicIndex) => {
        let sameValue = currentTopic === topic
        if (sameValue) { isUnique = currentTopicIndex === index }
        return sameValue
      })
      return isUnique
    },
    updateSettingsHandler (settings) {
      Vue.set(this.currentSettings, 'settings', settings)
    },
    generateTopics () {
      let topics = this.currentSettings.dataTopics.map(topic => topic.topicFilter)
      /* topics for uniq widget logic */
      if (this.currentSettings.settings.topics) {
        topics = uniq([...topics, ...this.currentSettings.settings.topics.map(topic => topic.topicFilter)])
      }
      return topics
    }
  },
  watch: {
    settings (settings) {
      this.currentSettings = merge({}, this.defaultSettings, settings)
    },
    'currentSettings.dataTopics' () {
      this.currentSettings.topics = this.generateTopics()
    },
    'currentSettings.settings.topics': {
      deep: true,
      handler () {
        this.currentSettings.topics = this.generateTopics()
      }
    }
  },
  mixins: [validateTopic],
  components: {
    Topic, Switcher, Informer, Clicker, Radial, Linear, Frame, Singleselect, Multiplier, Complex, StaticInformer, MultiInformer, Slider, Color, MapLocation, MapRoute, StatusIndicator, TextSender
  }
}
</script>
