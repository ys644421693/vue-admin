export const addEditButton = function () {
  var a = $('<span class="layout-delete el-button el-button--danger el-button--mini"><i class="el-icon-edit"></i>删除</span> <span class="layout-drag el-button el-button--info el-button--mini"><i class="el-icon-edit"></i>拖动</span>')
  $('.layout-edit').append(a)
  console.log($('.layout-edit'))
}
