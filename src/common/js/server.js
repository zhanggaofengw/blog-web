import {ERR_OK, SUCCESS_CODE, ERROR_CODE} from './config'
// 查询
export function queryAll(url, that) {
  return new Promise((resolve, reject) => {
    that.$ajax.get(url).then((response) => {
        if (ERR_OK === response.status) {
          if (response.data.statueCode === SUCCESS_CODE) {
            const responseData = response.data
            resolve(responseData)
          } else {
            resolve(false)
          }
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

//删除
export function deleteOne(url, title, that) {
  return new Promise((resolve, reject) => {
    that.$confirm(title, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      callback: action => {
        console.log(action)
        if (action === 'confirm') {
          that.$ajax.get(url).then((response) => {
              if (ERR_OK === response.status) {
                if (response.data.statueCode === SUCCESS_CODE) {
                  resolve(true)
                  that.$message({
                    message: response.data.msg,
                    type: 'success',
                    duration: 1000
                  })
                } else if (response.data.statueCode === ERROR_CODE) {
                  resolve(false)
                  that.$message({
                    message: response.data.msg,
                    type: 'error',
                    duration: 1000
                  })
                }
              } else {
                resolve(false)
                that.$message({
                  message: '删除失败',
                  type: 'error',
                  duration: 1000
                })
              }
            })
            .catch(err => {
              reject(err)
            })
        } else {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      }
    })
  })
}

//添加、更新
export function addOrUpdate(url, data, that) {
  return new Promise((resolve, reject) => {
    that.$ajax.post(url, data).then((response) => {
      if (ERR_OK === response.status) {
        if (response.data.statueCode === SUCCESS_CODE) {
          resolve(true)
          that.$message({
            message: response.data.msg,
            type: 'success',
            duration: 1000
            //onClose: () => {
            //  resolve(true)
            //}
          })
        } else if (response.data.statueCode === ERROR_CODE) {
          resolve(false)
          that.$message({
            message: response.data.msg,
            type: 'error',
            duration: 1000
          })
        }
      } else {
        resolve(false)
        that.$message({
          message: '失败',
          type: 'error',
          duration: 1000
        })
      }
    }).catch(err => {
      reject(err)
    })
  })
}
