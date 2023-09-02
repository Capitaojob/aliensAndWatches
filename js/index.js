import { showAlienName } from "./interface.js"
import { auxiliaryClick, auxiliaryHold, displayClick, displayHold, omnitrixBtn, omnitrixDisplay } from "./omnitrix.js"
import { handleTouchMove, handleTouchStart } from "./phone-handler.js"
import { playlistMatrix } from "./playlist.js"

// Event listeners and main application logic
omnitrixBtn.addEventListener("click", () => {
    auxiliaryClick()
})

omnitrixBtn.addEventListener("contextmenu", (e) => {
    auxiliaryHold(e)
})

omnitrixDisplay.addEventListener("click", () => {
    displayClick()
})

omnitrixDisplay.addEventListener("contextmenu", (e) => {
    displayHold(e)
})

export const changePlaylist = () => {
    if (currentPlaylist < playlistMatrix.length - 1) {
        currentPlaylist++
    } else {
        currentPlaylist = 0
    }
}

export const changeAlien = (direction) => {
    if (direction == "right") {
        if (currentAlienId < 9) {
            currentAlienId++
        } else {
            currentAlienId = 0
        }
    } else {
        if (currentAlienId > 0) {
            currentAlienId--
        } else {
            currentAlienId = 9
        }
    }

    showAlienName()
    storeAlienAndPlaylistInLocalStorage()
}

export const storeAlienAndPlaylistInLocalStorage = () => {
    localStorage.setItem("alienId", currentAlienId)
    localStorage.setItem("playlist", currentPlaylist)
}

export const storeMasterControlInLocalStorage = () => {
    isMasterControl = !isMasterControl

    localStorage.setItem("masterControl", isMasterControl)
}

// Gets
const getPlaylist = () => {
    const playlist = localStorage.getItem("playlist")
    return playlist !== null ? playlist : 0
}

const getAlienID = () => {
    const alienID = localStorage.getItem("alienId")
    return alienID !== null ? alienID : 0
}

const getMasterControl = () => {
    const storedMasterControl = localStorage.getItem("masterControl")
    return storedMasterControl !== null ? storedMasterControl : false
}

export let currentPlaylist = getPlaylist()
export let currentAlienId = getAlienID()
export let isMasterControl = getMasterControl()
