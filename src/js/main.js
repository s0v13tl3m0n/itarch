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
