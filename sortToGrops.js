 // sort to groups
let drag;
let drop;
let nDragRight = 0;
// const
const ARR_GROUPS = DATA.sortToGroups.drop;

let blAnimation = true;
/* createItems
--------------------------------------------------------------
Description: */
const createItems = () => {
    setDrag();
    setDrop();
    let data = shuffle(DATA.sortToGroups.drag);
    // create drop
    let dropContainer = El("div", {cls: `dropContainer`});
    document.querySelector(`.sortToGroupsContainer`).append(dropContainer);
    for(let j = 0; j < ARR_GROUPS.length; j++){
        let dropItem = El("div", {cls: `drop`, attributes: {"data-num": j + 1}},
            El("p",{cls: `p-groups`},ARR_GROUPS[j],),    
        );        
        //  ARR_GROUPS[j]);
        document.querySelector(`.dropContainer`).append(dropItem);
    }
    // create drag
    let dragContainer = El("div", {cls: `dragContainer`});
    document.querySelector(`.sortToGroupsContainer`).append(dragContainer);
    for(let i = 0; i < DATA.sortToGroups.drag.length; i++){
        let dragItem = El("div", {cls: `drag`, attributes: {"data-num": `${data[i].group}`, draggable: "true"}}, data[i].drag);
        document.querySelector(`.dragContainer`).append(dragItem);
    }
} 

/* setDrag
--------------------------------------------------------------
Description: */
setDrag = () => {
    /* events fired on the draggable target */
    document.addEventListener("drag", function(event) {
    }, false);
    document.addEventListener("dragstart", function(event) {
        // store a ref. on the dragged elem
        drag = event.target;
        drag.style.opacity = 0;
    }, false);
    document.addEventListener("dragend", function(event) {
        drag.style.opacity = 1;
    }, false);
}

/* setDrop
--------------------------------------------------------------
Description: */
setDrop = () => {
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);
    document.addEventListener("drop", function(event) {
        drop = event.target
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target
        if (drop.className == "drop") {
            // locate drag on drop
            drag.parentNode.removeChild(drag);
            drop.appendChild(drag);
            // style
            onDrop(drag, drop);        }
    }, false);
}

/* onDrop
--------------------------------------------------------------
Description: */ 
onDrop = () => {
    // debugger;
    if (drop.getAttribute("data-num") === drag.getAttribute("data-num")) {
        drag.style.cssText = "background-image: url(assets/media/right_box.svg);";  
        drag.setAttribute("draggable", "false");
        nDragRight++
        // debugger;
        if (nDragRight === DATA.sortToGroups.drag.length * 2) {
            setTimeout(finishPage,2000);
            // finishPage();
        }
    } else {
        drag.style.cssText = "background-image: url(assets/media/wrong_box.svg);";  
        if(blAnimation) {
            mistake();
            blAnimation = false;
        }
    }
}

let mistake = () => {
    document.querySelector(`.div-message`).style.display = "block";
    document.querySelector(`.div-message`).classList.add("animate-fading");
    document.querySelector(`.div-message`).addEventListener(`animationend`, () => {
        document.querySelector(`.div-message`).style.display = "none";
    })
}
