function addEvent(func) {
    let formerLoad = window.onload;
    if (typeof formerLoad !== 'function') {
        window.onload = func;
    } else {
        formerLoad();
        func();
    }
}



//hightLight Nav Li
function highLightNav() {
    let links = document.querySelector('nav').getElementsByTagName('a')
    for (let i = 0; i < links.length; i++) {
        linkUrl = links[i].getAttribute('href');
        if (window.location.href.indexOf(linkUrl) !== -1) {
            links[i].className = "here";

            // give unqiue id attribute to the body of each page

            let linkText = links[i].firstChild.nodeValue.toLowerCase();
            document.body.setAttribute('id', linkText);
        }
    }
}

function insertAfter(formerElement, afterElement) {
    // console.log(document.getElementById("intro").parentNode.children[1]);
    let parentNode = afterElement.parentNode;
    if (parentNode.lastElementChild === afterElement) {
        parentNode.appendChild(formerElement);
    }
}

function moveElement(elementID, final_x, interval) {
    let ele = document.getElementById(elementID);

    if (ele.movement) {
        // console.log('???', ele.movement);
        clearTimeout(ele.movement);
    }
    if (!ele.style.left) {
        ele.style.left = "0px"
    }
    let xpos = parseInt(ele.style.left);
    if (xpos === final_x) {
        console.log('complete');
        return true;
    }


    if (xpos < final_x) {
        let dis = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dis;
    }

    if (xpos > final_x) {
        let dis = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dis;
    }


    ele.style.left = xpos + 'px';

    let repeat = `moveElement('${elementID}',${final_x},${interval})`;
    // console.log(setTimeout(repeat, interval));
    ele.movement = setTimeout(repeat, interval);

}


// homePage 幻灯片功能实现.
function slideShow() {
    if (document.getElementById && document.getElementById('intro')) {
        // 创建div 和 两个img标签， 用来display幻灯片。
        let intro = document.getElementById('intro');
        let slideShow = document.createElement('div');
        slideShow.setAttribute("id", "slideShow");
        let frame = document.createElement("img");
        frame.setAttribute("src", "images/frame.gif");
        frame.setAttribute("alt", "");
        frame.setAttribute("id", "frame");
        slideShow.appendChild(frame);
        let preview = document.createElement("img");
        preview.setAttribute("src", "images/slideshow.gif");
        preview.setAttribute("alt", "a glimpse of what awaits you");
        preview.setAttribute("id", "preview");
        slideShow.appendChild(preview);
        insertAfter(slideShow, intro);

        // 
        document.querySelectorAll("a").forEach(data => {
            // console.log(data.getAttribute('href'));
            data.onmouseover = function() {
                let destination = this.getAttribute('href');
                if (destination.indexOf('index') !== -1) {
                    moveElement('preview', 0, 5);
                }
                if (destination.indexOf('about') !== -1) {
                    moveElement('preview', -150, 5);
                }
                if (destination.indexOf('photos') !== -1) {
                    moveElement('preview', -300, 5);
                }
                if (destination.indexOf('live') !== -1) {
                    moveElement('preview', -450, 5);
                }
                if (destination.indexOf('contact') !== -1) {
                    moveElement('preview', -600, 5);
                }
            }
        })

    }
}



function showSection(id) {
    let sections = document.getElementsByTagName("section");
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") !== id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function showDetail() {
    if (!document.querySelector('article')) return false;
    if (!document.querySelector('article').getElementsByTagName('nav')[0]) return false;

    let nav = document.querySelector('article').getElementsByTagName('nav')[0];
    let links = nav.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
        let Id = links[i].getAttribute('href').split('#')[1];

        //********  //判断document里面是否有带Id的section ******
        if (!document.getElementById(Id)) return false;
        //设置section的 display为none。
        document.getElementById(Id).style.display = "none";
        links[i].destination = Id
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}

function showPic(whichImg) {
    let source = whichImg.getAttribute('href');
    let imgPlaceHolder = document.getElementById('placeholder');
    imgPlaceHolder.setAttribute('src', source);
    let text = whichImg.getAttribute('title')
    let description = document.getElementById("description");
    console.log(description);
    console.log(description.firstChild.nodeType === 3);
    description.textContent = text;
}

function prepareImg() {
    if (!document.getElementById('imagegallery')) return false;
    let imgPlaceHolder = document.createElement('img');
    imgPlaceHolder.setAttribute('id', "placeholder");
    imgPlaceHolder.setAttribute("src", "images/placeholder.gif");

    description = document.createElement("p");
    description.setAttribute("id", "description");

    let desctext = document.createTextNode("Choose an img");
    description.appendChild(desctext);

    let gallery = document.getElementById('imagegallery');
    insertAfter(description, gallery);
    insertAfter(imgPlaceHolder, description);
    // 明确点击的哪一张图片，展示图片。
    let links = gallery.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', stopPropagation);
        links[i].onclick = function() {
            showPic(this);
        }
    }

}

function stopPropagation(event) {
    event.preventDefault();
}

function stripeTables() {
    // console.log(!document.getElementsByTagName('table'));
    if (document.getElementsByTagName('table')) { return false };
    let odd = false
    let rows = document.getElementsByTagName('table')[0].getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i += 1) {
        if (odd === true) {
            addClass(rows[i], "odd");
            console.log(rows[i])
            odd = false;
        } else {
            odd = true;
        }
    }
}


function addClass(element, value) {
    if (!element.className) {
        element.className = value
            // console.log(element)
    } else {
        element.className = value;
    }
}

function highLightRows() {
    let rows = document.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i += 1) {
        rows[i].onmouseover = function() {
            rows[i].oldClassName = rows[i].className;
            // console.log(typeof rows[i].oldClassName);
            addClass(this, "highlight")
        }
        rows[i].onmouseout = function() {
            if (this.oldClassName === '') { this.className = '' }
            this.className = this.oldClassName;
        }
    }
}

function showAbbr() {
    if (document.getElementsByTagName('abbr')) return false
    if (document.getElementsByTagName('abbr')) {
        let abbr = document.getElementsByTagName('abbr');
        let defs = [];
        for (let i = 0; i < abbr.length; i += 1) {
            let key = abbr[i].firstChild.nodeValue
            let definition = abbr[i].getAttribute('title');
            defs[key] = definition;
        }
        let dlist = document.createElement("dl");
        for (key in defs) {
            let dtitle = document.createElement('dt');
            let dtitle_text = document.createTextNode(key);
            dtitle.appendChild(dtitle_text);
            let ddesc = document.createElement("dd");
            let ddesc_text = document.createTextNode(defs[key]);
            ddesc.appendChild(ddesc_text);
            dlist.appendChild(dtitle);
            dlist.appendChild(ddesc);
        }

        let header = document.createElement("h3");
        let header_text = document.createTextNode("Abbreviations");
        header.appendChild(header_text);
        let articles = document.getElementsByTagName("article");
        if (articles.length == 0) return false;
        let container = articles[0];
        container.appendChild(header);
        container.appendChild(dlist);
    }

}

function focusLabels() {
    if (window.location.href.indexOf('contact') === -1) return false
    let labels = document.getElementsByTagName('label');
    for (let i = 0; i < labels.length; i += 1) {
        labels[i].onclick = function() {
            let id = this.getAttribute('for');
            let element = document.getElementById(id);
            element.focus();
        }
    }
}
// for simple, only use one unit form!
function resetFields(Form) {
    //检查brower是否支持placeholder属性
    // if (Modernizr.input.placeholder) return;


    // 有的old brower 不支持placeholder， 下面为defensive strategy。

    for (let i = 0; i < Form.elements.length; i += 1) {
        let element = Form.elements[i]
            // ************************************************
            // console.log(element) //有疑问
            //********************************************* 
            // let check = element.placeholder || element.getAttribute('placeholder');
        let text = this.placeholder || element.getAttribute('placeholder');
        element.onfocus = function() {
            if (element.value === text) {
                this.className = '';
                this.value = ''
            }
        }
        element.onblur = function() {
            if (this.value === '') {
                this.className = 'placeholder';
                this.value = this.placeholder || this.getAttribute('placeholder');
            }
        }
        element.onblur()
    }

}

function prePareForms() {
    let form = document.forms[0];
    resetFields(form);

    form.onsubmit = function() {
        let middle = validateForm(this);
        ajaxHttpRequest(middle);
    }
    form.addEventListener('submit', stopPropagation);
}




function validateForm(targetForm) {
    // console.log(targetForm)
    let array = []
    for (let i = 1; i < targetForm.elements.length - 1; i += 1) {

        let element = targetForm.elements[i];
        let combineNameAndValue = element.name + '=' + element.value
            // console.log('name', combineNameAndValue)
        array.push(combineNameAndValue)
    }
    // console.log(array);
    if (!isFilled(array[1])) {
        alert('please check your name');
        return false
    }
    return array;
}


function isFilled(filed) {
    if (filed !== '' && filed !== 'Your name') {
        return true
    } else {
        return false
    }
}

function ajaxHttpRequest(userInputData) {
    console.log(userInputData.join('&'));

    let url = document.getElementById('bandForm').getAttribute('action');
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(xhr.responseText);
            document.getElementById('bandForm').textContent = xhr.responseText
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

}



addEvent(highLightNav);
addEvent(slideShow);
addEvent(prepareImg)
addEvent(showDetail)
addEvent(highLightRows)
addEvent(stripeTables)
addEvent(showAbbr)
addEvent(focusLabels)
addEvent(prePareForms)