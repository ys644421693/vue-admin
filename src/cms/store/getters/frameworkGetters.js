export const frameworkData = (state) => {
  state.frameworkAttr.data = state.data
  return state.frameworkAttr
}
export const frameworkAttrHeight = (state) => {
  return state.frameworkAttr.height
}
export const frameworkAttrLayoutValue = (state) => {
  return state.frameworkAttr.layoutValue
}
export const frameworkAttrDirectionValue = (state) => {
  return state.frameworkAttr.directionValue
}
export const frameworkAttrWidth = (state) => {
  return state.frameworkAttr.width
}
export const frameworkAttrHeightBottom = (state) => {
  console.info(state)
  return state.frameworkAttr.heightBottom
}
export const getFrameworkAttr = (state) => {
  return state.frameworkAttr
}
