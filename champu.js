
window.onload=function(){
    addDrawerMenuEvents();
    addButtonMenu();
    addTabEvents();
}
function removeClassAll(array,className){
    Array.prototype.forEach.call(array,el=>{
        el.classList.remove(className);
    });
}
function loadComponent(componentName) {
    var result="";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { 
           if (xmlhttp.status == 200) {
               result = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              result='<h1>Componente no encontrado</h1>';
           }
           else {
               result="<h1>Error desconocido</h1>";
           }
        }
    };
    xmlhttp.open("GET", componentName+'.html', false);
    xmlhttp.send();
    var workspace=document.getElementsByClassName("workspace");
    if(workspace.length>0){workspace[0].innerHTML=result;}
}
function addDrawerMenuEvents(){
    var drawer=document.getElementsByClassName("drawer");
    if(drawer.length==0){return;}
    var floatDrawer=document.createElement("DIV");
    floatDrawer.classList.add("floatDrawer","hide");
    floatDrawer.innerHTML=drawer[0].innerHTML;
    document.body.appendChild(floatDrawer);
    var fDrawerList=floatDrawer.getElementsByTagName("li");
    var drawerList=drawer[0].getElementsByTagName("li");
    Array.prototype.forEach.call(drawerList,(el,index)=>{
        el.addEventListener("click",()=>{
            Array.prototype.forEach.call(drawerList,(item)=>{
                item.classList.remove("active");
            })
            el.classList.add("active");
            console.log("haz hecho click en "+el.innerHTML);
        });
        fDrawerList[index].addEventListener("click",()=>{el.click();});
    });
}
function addButtonMenu(){
    var toolbar=document.getElementsByClassName("toolbar");
    if(toolbar.length==0){return;}
    var btnMenu=document.createElement("BUTTON");
    btnMenu.addEventListener("click",function(){
        floatDrawer();
    });
    toolbar[0].append(btnMenu,document.getElementsByClassName("brand")[0]);
    btnMenu.classList.add("btn-menu");
}
function addTabEvents(){
    var tab=document.getElementsByClassName("tab");
    Array.prototype.forEach.call(tab,element=> {
        var mytab=element;
        var tabPages=element.getElementsByTagName("li");
        Array.prototype.forEach.call(tabPages,(li,index)=>{
            var i=index;
            li.addEventListener("click",function(){
                removeClassAll(tabPages,"active");
                li.classList.add("active");
                var contents=mytab.getElementsByClassName("item");
                Array.prototype.forEach.call(contents,item=>{
                    if(item.id=='tab'+(i+1)){
                        item.style.display="block";
                    }else{
                        item.style.display="none";
                    }
                });
            });
            if(li.classList.contains("active")){li.click();}
        });
    });
}
function floatDrawer(){
    var drawer=document.getElementsByClassName("floatDrawer")[0];
    if(drawer.classList.contains("hide")){
        drawer.classList.remove("hide");
    }else{
      drawer.classList.add("hide");  
    }
}