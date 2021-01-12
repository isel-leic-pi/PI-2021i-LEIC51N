window.onload = setup

function setup() {
    const btAdd = document.getElementById('btAdd')
    const txtArtistName = document.getElementById('txtArtistName')
    btAdd.addEventListener('click', () => handlerAddArtist(txtArtistName))
    document
        .querySelectorAll('.artistItem')
        .forEach(elem => {
            elem
                .querySelector('.btn')
                .addEventListener('click', () => handlerRemoveArtist(elem.id))
        })
}

/**
 * @param {String} id
 */
function handlerRemoveArtist(id) {
    document.getElementById(id).remove()
}

/**
 * @param {Element} txtArtistName 
 */
function handlerAddArtist(txtArtistName) {
    const artistName = txtArtistName.value
    /**
     * Create a new LI element and append it to the UL
     */
    document
        .querySelector('ul')
        // .insertAdjacentHTML("beforeend", `<li>${artistName}<button class="btn" id="bt${artistName}">Delete</button></li>`)
        .insertAdjacentHTML("beforeend", `<li id="${artistName}">${artistName}<button class="btn" onclick="handlerRemoveArtist('${artistName}')">Delete</button></li>`)
    
    /*
    document
        .getElementById('bt' + artistName)
        .addEventListener('click', () => handlerRemoveArtist())
    */
}