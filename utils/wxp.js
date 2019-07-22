const methods = [
  'getStorage',
  'setStorage',
  'login',
  'checkSession',
  'getUserInfo',
  'downloadFile',
  'getImageInfo',
  'chooseImage',
  'chooseVideo',
  'uploadFile',
  'saveImageToPhotosAlbum',
  'getSystemInfo',
  'requestPayment'
]

const wxp = {}

wxp.request = (args = {}) => (
  new Promise((resolve, reject) => {
    args.success = (res) => {
      if (res.statusCode === 200) {
        resolve(res)
      } else {
        reject(res)
      }
    }
    args.fail = (err) => reject(err)
    wx.request(args)
  })
)
methods.forEach((method) => {
  wxp[method] = (args = {}) =>
    new Promise((resolve, reject) => {
      args.success = (res) => resolve(res)
      args.fail = (err) => reject(err)
      wx[method](args)
    })
})

module.exports = wxp