function swap_theme() {
    var element = document.body
    if (element != null) {
       element.classList.toggle("dark-mode");
    }
 }
 
 function set_theme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
       swap_theme()
    }
 }

function add_to_cart(item) {
    setCookie("cart", getCookie("cart")  + "/" + item, 30)
    console.log(getCookie("cart"))
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
    return "";
    }

function checkCookie() {
    let username = getCookie("cart");
        if (username != "") {
        setCookie("cart", [], 30);
    }
}

function additem(item){
    add_to_cart(item)
    location.reload()
}

function delitem(item){
    let cartarray = getCookie("cart").split("/").slice(1)
    for (let i = 0; i < cartarray.length; i++) {
        if (cartarray[i] == item) {
            cartarray[i] = ""
            break;
        }
    }
    console.log(cartarray)
    setCookie("cart", "/"+cartarray.join("/"), 30);
    location.reload()
}

function cartPage() {
    const cartMap = new Map();
    let cart = getCookie("cart").split("/").slice(1)
    for (var x of cart) {
        if (!(cartMap.has(x))){
            cartMap.set(x, 1)
        } else {
            cartMap.set(x, cartMap.get(x)+1);
        }
    }
    for (var[key, value] of cartMap){
        if (value != 0 && key != ""){
        document.getElementById('cart_cont').innerHTML += `<br>${key} : ${cartMap.get(key)} <button onclick="delitem('${key}')">delete</button> <button onclick="additem('${key}')">add</button>`;}}}