export default {
  /*setCookie: function (cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },*/
  /*getCookie: function (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    // console.log("获取cookie,现在循环")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      // console.log(c)
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },*/
  clearCookie: function (cname) {
    this.setCookie(cname, '', -1)
  },
  setCookie(cdata,exdays){
    document.cookie=cdata;
    let a=exdays;
  },
  getCookie(cname){
    let udata = JSON.parse(cname)
    return udata;
  }
}
