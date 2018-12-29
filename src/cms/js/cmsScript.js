export const addEditButton = function () {
  // var counts = $('.leftElement .layout-edit').find('.layout-delete').length
  // if (counts >= 1) {
  //   return
  // }
  var a = $('<span class="layout-delete el-button el-button--danger el-button--mini">删除</span> <span class="el-button el-button--info el-button--mini layout-drag">拖动</span>')
  $('.layout-edit').append(a)
}
export const addBut = function () {
  var find = $('.leftElement').find('.item-label')
  console.log(find.length)
  var but = $('<span class="layout-drag item-label">拖</span>')
  $('.component').append(but)
  addEditButton()
  initDraggable()
}

export const initDraggable = function () {
  $('.cms-container').sortable({
    revert: true,
    handle: '.layout-drag'
  })
  $('.component').sortable({
    handle: '.item-label',
    cursor: 'move',
    opacity: 0.5,
    connectWith: '.cms-container'
  })
  $('.component').draggable({
    connectToSortable: '.cms-container',
    helper: 'clone',
    handle: '.item-label',
    revert: 'invalid',
    start: function (event, ui) {
      $(this).find('.layout-edit').show()
    },
    stop: function (event, ui) {
      $('.leftElement .layout-edit').hide()
      $('.edit .layout-edit').show()
      $('.edit .item-label').remove()
      $('.layout-delete').click(function () {
        $(this).parents('.component').remove()
      })
    }
  })
}
