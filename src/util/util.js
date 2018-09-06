import $ from 'jquery';
class Util {
  request(param) {
    return new Promise((resolve, reject) => {
      let access_token = this.getStorage('userInfo').access_token;
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", `Bearer ${access_token}`);
        },
        success: res => {
          // 数据请求成功
          typeof resolve === 'function' && resolve(res);
        },
        error: err => {
          // 未登录状态,强制去登陆
          if (401=== err.status) {
            this.doLogin();
          } else {
              let errMsg;
              if(err.responseJSON){
                  errMsg = err.responseJSON.message;
              } else{
                  errMsg = '请求服务器失败。'
              }
            // typeof reject === 'function' && reject(err.responseJSON.message);
            typeof reject === 'function' && reject(errMsg);
          }
        }
      });
    });
  }
  // 登录跳转
  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }
  // 获取url参数
  getUrlParam(name) {
    // param=123&param1=456
    let queryString = window.location.search.split('?')[1] || '';
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let result = queryString.match(reg);
    //result : ['param=123', '', '123', '&']
    return result ? decodeURIComponent(result[2]) : null;
  }
  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || '请求失败');
  }
  // 成功提示
  successTips(successMsg) {
    alert(successMsg || '操作成功');
  }
  // 设置本地存储
  setStorage(name, data) {
    let dataType = typeof data;
    // JSON对象
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    } else {
      alert('该类型不能用于本地存储');
    }
  }
  // 取出本地存储内容
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return '';
    }
  }
  // 删除本地存储内容
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default Util;