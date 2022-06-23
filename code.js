let strLocation = "start-page" //המשתנה שומר את המקום של המשתמש ומחזיר אותו לשם בסגירת האודות
let nMark = 0; // מספר הסימונים ב check list
let nRightAnswer = 0 //משתנה ששומר על כמה תשובות נכונות לחצו
let arrChoiceAns = [];
let elMark = ""; //האלמנט שלחצו/סימנו 
let srtTitle = "10 החוקים בכיתה";

const NUM_TRUE_ANS = 3; // מספר החוקים הנכונים

window.addEventListener("load", () => {
    document.querySelector(".loader").classList.add("fade");
    document.querySelector(".odot-logo").addEventListener("click", odot);
    addCheckList();
});

// פונקציה האחראית על פתיחת האודות
let odot = () => {
    document.querySelector(`.${strLocation}`).style.display = "none";
    document.querySelector(`.div-odot`).style.display = "block";  
    document.querySelector(`.div-body`).style.overflow = "hidden";
    document.querySelector(`.odot-logo`).style.display = "none"; 
    document.querySelector(`.p-title`).innerHTML = "אודות";
    document.querySelector(`#back-button-odot`).addEventListener("click", () => {
        document.querySelector(`.${strLocation}`).style.display = "block";
        document.querySelector(`.p-title`).innerHTML = srtTitle;
        document.querySelector(`.div-odot`).style.display = "none";  
        document.querySelector(`.odot-logo`).style.display = "block";  
        document.querySelector(`.div-body`).style.overflow = "scroll";
    });
}

let addCheckList = () => {
    for (let i = 0; i < DATA.rules.length; i++) {
        let item = El("div", {cls: `div-rules`},
        El("img",{attributes: {class: `img-checkList`, id : `img${i}`, src : `assets/media/check_box.svg`, alt : `V`}, listeners : {click : mark}},),
        El("p",{cls: `title-rules`}, DATA.rules[i][`rule`]),            
        );
        document.querySelector(`.div-checkList`).append(item);
    }
    // const btn = document.createElement("button");
    // btn.innerHTML = "בדוק";
    // btn.id = "btn"
    // document.querySelector(`.checkList`).appendChild(btn);
}

let El = (tagName, options = {}, ...children) => {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}

let mark = (event) => {
    elMark = document.querySelector(`#${event.target.id}`);
    let locArr = Number(event.target.id.charAt(3));

    if (nMark < NUM_TRUE_ANS && elMark.getAttribute('src') === "assets/media/check_box.svg") {
        nMark++;
        arrChoiceAns.push(locArr);
        elMark.setAttribute("src", "assets/media/V_checkbox.svg");

        if (nMark === NUM_TRUE_ANS) {
            document.querySelector(`.check-button`).style.display = "block";
            document.querySelector(`.check-button`).addEventListener("click", check);
        }
    } else if (elMark.getAttribute('src') !== "assets/media/check_box.svg") {
        nMark--;
        elMark.setAttribute("src", "assets/media/check_box.svg");
        document.querySelector(`.check-button`).style.display = "none";
        for (let i = 0; i < arrChoiceAns.length; i++) {
            if (arrChoiceAns[i] === locArr) {
                arrChoiceAns.splice(i, 1);
            }
        }
    }
}

let check = () => {
    document.querySelector(`.div-check`).style.display = "flex";
    document.querySelector(`.checkList`).style.display = "none";
    for (let i = 0; i < NUM_TRUE_ANS; i++) {
        for (let j = 0; j < DATA.rules.length; j++) {
            if (arrChoiceAns[i] === j) {
                if(DATA.rules[j]["ans"]) {
                    nRightAnswer++;
                    document.querySelector(`#img${j}`).setAttribute("src", "assets/media/green_V.svg");
                } else {
                    document.querySelector(`#img${j}`).setAttribute("src", "assets/media/red_V.svg");
                }
            }
        }
    }
    if (nRightAnswer === NUM_TRUE_ANS) {
        document.querySelector(`.h-div-check`).innerHTML = "בסופש השאירו את החלון פתוח וכל השלטים עפו והתערבבו לנו <br> תעזרו לנו למיין אותם ובתמורה תקבלו את הספרה הראשונה למגירה";
        srtTitle = "כל הכבוד!";
        document.querySelector(`.p-title`).innerHTML = srtTitle;
        document.querySelector(`.h-div-check`).style.fontSize = "0.5em"
        // document.querySelector(`.p-title`).style.display = "none";
        document.querySelector(`.next`).style.display = "block";
        document.querySelector(`.next`).addEventListener("click", dropPage);
    } else {
        document.querySelector(`.h-div-check`).innerHTML = "טעיתם";
        document.querySelector(`.try-again`).style.display = "block";
        nRightAnswer = 0;
        document.querySelector(`.try-again`).addEventListener("click", () => {
            document.querySelector(`.div-check`).style.display = "none";
            document.querySelector(`.checkList`).style.display = "block";
            document.querySelector(`.try-again`).style.display = "none";

        })
    }
}

let dropPage = () => {
    strLocation = "drop-page";
    document.querySelector(`body`).style.backgroundImage = "url(assets/media/closeup_background.svg)"
    document.querySelector(`.p-title`).style.display = "none";
    document.querySelector(`.drop-page`).style.display = "block";
    document.querySelector(`.start-page`).style.display = "none";
    setDrag();
    setDrop();
    createItems();
    shuffle(DATA.sortToGroups);
}

let shuffle = (arr) => {
    let tmp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * tmp.length);
        arr[i] = tmp[index];
        tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}

let finishPage = () => {
    document.querySelector(`.${strLocation}`).style.display = "none";
    strLocation = "finish-page";
    document.querySelector(`.${strLocation}`).style.display = "block";
}