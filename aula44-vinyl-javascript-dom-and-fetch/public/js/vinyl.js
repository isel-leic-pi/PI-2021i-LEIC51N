'use strict'

window.onload = setup

function setup() {
    document
        .querySelectorAll('.artistItem')
        .forEach(item => {
            item
                .querySelector('button')
                .addEventListener('click', () => handlerRemoveArtist(item))
        })
}

/**
 * @param {Element} item 
 */
function handlerRemoveArtist(item){
    /**
     * 1. Read the artist name to remove
     * 2. fetch to /api/vinyl/users/:username/artists/:artist
     * 3. If succeeded => Remove TR else Show an Error
     */
    const elemArtist = item.querySelector('.artistName')
    const artist = elemArtist.textContent
    const artistId = elemArtist.dataset.vinylId
    const loc = document.location.href
    const path = loc.replace('/vinyl', '/api/vinyl') + '/artists/' + artistId
    fetch(path, {'method': 'DELETE'})
        .then(resp => {
            if(resp.status == 200) {
                item.remove()
                msgBox(artist + ' removed successfully!', 'success')
            }
            else msgBox(resp.statusText)
        })
        .catch(err => msgBox(err))
}

/**
 * @param {*} message 
 * @param {(success|danger)} kind 
 */
function msgBox(message, kind) {
    if(!kind) kind = 'danger'
    const content = `<div class="alert alert-${kind} alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
    document
        .querySelector('.messages')
        .innerHTML = content
}