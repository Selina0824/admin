import $ from 'jquery';
class Util {
  request(param) {
    return new Promise((resolve, reject) => {
      // let access_token = this.getStorage('userInfo').access_token;
      let access_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2NsYXNzX3R5cGUiOjAsInVzZXJfaWQiOjEsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsidWkiXSwidXNlcl9yb2xlcyI6WyJhZG1pbiJdLCJleHAiOjE1MzU3MjQ2MjMsImF1dGhvcml0aWVzIjpbIlJFUzpSRVM6UiIsIkFDQzpDT046QyIsIkFDQzpDT046RCIsIlJFUzpSRVM6RCIsIlJFUzpSRVM6QyIsIlNFUjpBREQ6UiIsIkFDQzpBQ0M6UiIsIlNFUjpBREQ6RCIsIlNFUjpBREQ6QyIsIkFDQzpBQ0M6VSIsIlJFRzpSRUc6QyIsIkFDQzpWQUw6UiIsIkFDQzpURUE6UiIsIkFDQzpBVEU6QyIsIkFDQzpDTEE6VSIsIkFDQzpWQUw6VSIsIkFDQzpURUE6RCIsIkFDQzpURUE6QyIsIkFDQzpDTEE6UiIsIlJFRzpSRUc6RCIsIkFDQzpBQ0M6QyIsIlNFUjpBREQ6VSIsIkFDQzpDTEE6RCIsIkFDQzpDTEE6QyIsIkFDQzpDT046VSIsIkFDQzpURUE6VSIsIlJFUzpSRVM6VSIsIkFDQzpDT046UiIsIkFDQzpTQ0g6VSIsIkFDQzpST0w6VSIsIkFDQzpVU0U6RCIsIkFDQzpSRUc6RCIsIkFDQzpMT0c6RCIsIkFDQzpMT0c6QyIsIkFDQzpVU0U6QyIsIlNFUjpJVEU6QyIsIlNFUjpTVE86RCIsIkFDQzpTQ0g6UiIsIlNFUjpTVE86QyIsIlNFUjpJVEU6RCIsIlJFRzpSRUc6UiIsIkFDQzpST0w6RCIsIkFDQzpTQ0g6QyIsIkFDQzpTQ0g6RCIsIkFDQzpBVVQ6RCIsIkFDQzpBVVQ6QyIsIkFDQzpWQUw6RCIsIkFDQzpBVVQ6UiIsIkFDQzpSRUc6VSIsIkFDQzpST0w6UiIsIlNFUjpJVEU6UiIsIlJFRzpSRUc6VSIsIkFDQzpSRUc6UiIsIlNFUjpJVEU6VSIsIkFDQzpBVVQ6VSIsIkFDQzpST0w6QyIsIkFDQzpVU0U6VSIsIkFDQzpVU0U6UiIsIkFDQzpVU0M6UiIsIkFDQzpMT0c6VSIsIlNFUjpTVE86VSIsIlNFUjpTVE86UiIsIkFDQzpMT0c6UiJdLCJqdGkiOiI1NzVlZGU5NS0wYjg4LTRjOGItOTk2MC1mMDEzOTMzM2UxNzMiLCJjbGllbnRfaWQiOiJicm93c2VyIn0.UHBfVPKQyFbyTNbZtJ-XmbjJn66w-bF5MRB51s6dTAHYF-HtfvSCl5RaYwjOZgJFDyuOp9Y8-8GwPes0PxYC1de_0Oyuzfv8twWsmViPOLOSNa4rrp2B4wCTaKpnh9OUTEoK9xU40OPXYju-bs-jRS2VvGrktu6Kc5nakSKyEEYaon7sLhN9YpwjqT06hJqUKDs_sOldDCU4VlDZspVJvj_1xc9Q7JKVXmE-4gGtBfW7N304zG-MHQ0f7sF79YDZ8C7aeeQj6N1L2ZnzICGuPTNj8bI-ABqjT1VwgYmBBfRDIaZNIGqFwyg8BImlQE81XCrw83kitW-MhA78IBfb_w';
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
            typeof reject === 'function' && reject(err.message);
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
  // 错误提示
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