export function menuFilter(list) {
  let menu = []
  list.forEach((item) => {
    if (item.pid === 0) {
      menu.push(item)
      list.forEach((i) => {
        if (item._id === i.pid) {
          if (!item.subMenu) {
            item.subMenu = []
          }
          i.indexPath = '/home/' + i.path
          item.subMenu.push(i)
        }
      })
    }
  })
  return menu
}
