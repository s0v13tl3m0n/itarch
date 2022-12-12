var prices = {
    "HP Pavilion Gaming Laptop": 1499.99,
    "HP chromebook": 399.99,
    "HP Probook": 482.99,
    "HP ENVY": 1029.99,
    "APPLE iphone 13": 879.99,
    "SAMSUNG Galaxy S22": 899.99,
    "GOOGLE Pixel 7": 649.99,
    "OPPO A54": 219.99,
    "SONY WH-1000XM5": 359.99,
    "META Quest 2": 449.99,
    "FITBIT Versa 3": 149.99,
    "DJI Air 2S Drone": 1029.99,
    "SAMSUNG QE55S95BATXXU": 1799.99,
    "HISENSE 43A6BGTUK 43": 299.99,
    "JVC LT-58CA810 Android TV": 499.99,
    "SAMSUNG The Frame QE32LS03BBUXXU 32": 549.99,
};

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
        console.log(prices[key])
        if (value != 0 && key != ""){
            cost = (cartMap.get(key) * prices[key]).toFixed(2);
            var table = document.getElementById("cart_cont");
            var row = table.insertRow(1);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            cell1.innerHTML = `${key}`;
            cell2.innerHTML = `${cartMap.get(key)}`; 
            cell3.innerHTML = `${prices[key]}`;
            cell4.innerHTML = `${cost}`; 
            cell5.innerHTML = `<button onclick="delitem('${key}')">delete</button>`;
            cell6.innerHTML = `<button onclick="additem('${key}')">add</button>`;
        }
    }}
