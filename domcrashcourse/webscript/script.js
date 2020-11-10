window.onload = function() {
    navBarHighLight();
    backgroundImgmove();
    showSingerInfo();
    imgMagify()
};

// highLightTitle 
function navBarHighLight() {
    navHomeDefaultColor = document.querySelector('a');
    let urlFragement = window.location.href.split('/')[4];
    let elem = document.querySelectorAll('a');
    for (let i = 0; i < elem.length; i += 1) {

        if (elem[i].getAttribute('href') === urlFragement) {
            elem[i].style.backgroundColor = 'red';

            let elemtext = elem[i].lastChild.nodeValue.toLocaleLowerCase();
            elem[i].getRootNode().querySelector('header').setAttribute('id', elemtext);
        }
    }
};

// slideshow in homePage
function backgroundImgmove() {
    let links = document.getElementsByTagName('a');
    let destination;
    for (let i = 0; i < links.length; i += 1) {
        links[i].onmouseover = function() {

            let urlFragement = window.location.href.split('/')[4];
            destination = links[i].getAttribute('href');

            if (urlFragement === 'home.html') {
                if (destination.indexOf('bandabout.html') !== -1) {
                    document.querySelector('.img1').setAttribute("style", "background-position-x: -150px")
                }
                if (destination.indexOf('home.html') !== -1) {
                    document.querySelector('.img1').setAttribute("style", "background-position-x: 0px")
                }
                if (destination.indexOf('bandphoto.html') !== -1) {
                    document.querySelector('.img1').setAttribute("style", "background-position-x: -300px")
                }
                if (destination.indexOf('bandlive.html') !== -1) {
                    document.querySelector('.img1').setAttribute("style", "background-position-x: -450px")
                }
                if (destination.indexOf('bandcontact.html') !== -1) {
                    document.querySelector('.img1').setAttribute("style", "background-position-x: -600px")
                }
            }
        }
    }
}

//AboutPage show singer infomation
function showSingerInfo() {
    window.onclick = function(data) {
        if (data.path[0].innerText === "Jay Skript") {
            document.querySelector('#showSection1').setAttribute('hidden', true);
            document.querySelector('#showSection').removeAttribute('hidden');
        }

        if (data.path[0].innerText === "The Domsters") {
            document.querySelector('#showSection').setAttribute('hidden', true);
            document.querySelector('#showSection1').removeAttribute('hidden');
        }
    }
}


// magnify Img 
function imgMagify() {
    if (window.location.href.indexOf('bandphoto') !== -1) {
        window.onclick = function(data) {
            if (data.path[0].src.indexOf('bassist') !== -1) {
                document.querySelectorAll('img').item(5).setAttribute('src', 'http://127.0.0.1:5500/images/photos/bassist.jpg')
            }
            if (data.path[0].src.indexOf('concert') !== -1) {
                document.querySelectorAll('img').item(5).setAttribute('src', 'http://127.0.0.1:5500/images/photos/concert.jpg')
            }
        }
    }
}


// submit Form
function submitForm() {
    //知识范围外
    console.log(document.getElementById('bandForm').elements[0].value);
    console.log(document.querySelector('#bandForm').elements[1].value);
    console.log(document.querySelector('textarea').value);
    for (i = 0; i < 2; i += 1) {
        console.log(document.querySelector('#bandForm').elements[i].value)

        document.querySelector('#bandForm').elements[i].value = ''
    }

}