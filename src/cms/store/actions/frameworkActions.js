import axios from 'axios'

export const getData = ({ commit }) => {
  axios.get('http://www.baidu.com', {}).then((response) => {
    commit('FRAMEWORK_SUCCESS', response.data)
  }).catch((er) => {
    console.error(er)
  })
}

export const updateFrameworkAttr = ({ commit }, { value, key }) => {
  console.info(key === 'FRAMEWORK_ATTR_HEIGHTBOTTOM')
  console.info(key)
  console.info(typeof key)
  if (key === 'FRAMEWORK_ATTR_HEIGHT') {
    commit('FRAMEWORK_ATTR_HEIGHT', value)
  } else if (key === 'FRAMEWORK_ATTR_LAYOUTVALUE') {
    commit('FRAMEWORK_ATTR_LAYOUTVALUE', value)
  } else if (key === 'FRAMEWORK_ATTR_DIRECTIONVALUE') {
    commit('FRAMEWORK_ATTR_DIRECTIONVALUE', value)
  } else if (key === 'FRAMEWORK_ATTR_WIDTH') {
    commit('FRAMEWORK_ATTR_WIDTH', value)
  } else if (key === 'FRAMEWORK_ATTR_HEIGHTBOTTOM') {
    commit('FRAMEWORK_ATTR_HEIGHTBOTTOM', value)
  }
}
