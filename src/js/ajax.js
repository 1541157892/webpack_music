function ajax(method, url, data, callback, flag){
    var xhr = null;
    var data = data || {};
    var flag = flag || true;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("micrososoft.XMLHttp");
    }
    method = method.toUpperCase();
    if(method == "GET"){
        xhr.open(method, url + "?" + data, flag);
        xhr.send();
    }else if(method == "POST"){
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.open(method, url, flag);
        xhr.send();
    }
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                callback(xhr.responseText);
            }
        }
    }
}

export default ajax;