function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value) {
    if (!element.className){
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName +=" ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightPage(href) {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    var linkurl;
    var links = navs[0].getElementsByTagName('a');
    for (var i=0;i<links.length;i++){
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1){
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            console.log(linktext);
            document.body.setAttribute("id",linktext);
        }
    }
}

function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y){
        return true;
    }
    if (xpos<final_x){
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x){
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y){
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y){
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x +","+final_y +"," + interval+")";
    elem.movement = setTimeout(repeat,interval);
}


function prepareSlideshow() {
    if(!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if(!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    // var slideshow = document.createElement("div");
    // slideshow.setAttribute("id","slideshow");
    // var preview = document.createElement("img");
    // preview.setAttribute("src","../imgs/group.png");
    // preview.setAttribute("alt","a glimpse of what await you");
    // preview.setAttribute("id","preview");
    // slideshow.appendChild(preview);
    // insertAfter(slideshow,intro);
    var links = document.getElementsByTagName("a");
    var destination;
    for (var i =0 ;i<links.length;i++){
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html")!=-1){
                console.log("index");
                moveElement("preview",-900,0,5);
            }
            if (destination.indexOf("about.html")!=-1){
                console.log("about");
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("photos.html")!=-1){
                console.log("photos");
                moveElement("preview",-1200,0,5);
            }
            if (destination.indexOf("live.html")!=-1){
                console.log("live");
                moveElement("preview",-600,0,5);
            }
            if (destination.indexOf("contact.html")!=-1){
                console.log("contact");
                moveElement("preview",0,0,5);
            }
        }
    }
}

function showSection(id) {
    var sections = document.getElementsByTagName("section");
    console.log(sections);
    for (var i=0;i<sections.length;i++){
        if (sections[i].getAttribute("id") != id){
            sections[i].style.display = "none";
        }
        else {
            sections[i].style.display = "block"
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementsByTagName)return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    console.log(articles);
    if (articles.length==0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    console.log(navs);
    if (navs.length == 0) return false;
    var nav = navs[0];
    console.log(nav);
    var links = nav.getElementsByTagName("a");
    for (var i=0;i<links.length;i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        console.log(sectionId);
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        console.log("11111"+links[i].destination);
        links[i].onclick = function () {
            console.log(this.destination);
            showSection(this.destination);
            return false;
        }
    }
}

function showPic(whichpic) {
    console.log(whichpic);
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if (!document.getElementById("description")) return false;
    if (whichpic.getAttribute("title")){
        var text = whichpic.getAttribute("title");
        console.log("text " + text);
    }else {
        var text = " ";
    }
    var description = document.getElementById("description");
    // todo

    return false;
}

// function preparePlaceholder() {
//     // if (!document.createElement) return false;
//     // if (!document.createTextNode) return false;
//     // if (!document.getElementById) return false;
//     // if (!document.getElementById("imagegallery")) return false;
//     // var placeholder = document.createElement("img");
//     // placeholder.setAttribute("id","placeholder");
// }

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    console.log(gallery);
    var links = gallery.getElementsByTagName("a");
    console.log(links);
    for (var i=0;i<links.length;i++){
        links[i].onclick = function () {
             return showPic(this);
        }
    }
}


addLoadEvent(prepareGallery);
addLoadEvent(prepareInternalnav);
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
