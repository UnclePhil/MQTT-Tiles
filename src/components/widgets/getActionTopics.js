import getClickerActionTopics from './clicker/getActionTopics.js'
import getSingleselectActionTopics from './singleselect/getActionTopics'
import getSwitcherActionTopics from './switcher/getActionTopics'
import getTextSenderActionTopics from './textSender/getActionTopics'

export default function getACtionTopics (widgets) {
  return widgets.reduce((topics, widget) => {
    switch (widget.type) {
      case 'switcher': {
        topics = [...topics, ...getSwitcherActionTopics(widget)]
        break
      }
      case 'singleselect': {
        topics = [...topics, ...getSingleselectActionTopics(widget)]
        break
      }
      case 'clicker': {
        topics = [...topics, ...getClickerActionTopics(widget)]
        break
      }
      case 'textSender': {
        topics = [...topics, ...getTextSenderActionTopics(widget)]
        break
      }
    }
    return topics
  }, [])
}
