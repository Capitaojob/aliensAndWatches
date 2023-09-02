import { currentAlienId, currentPlaylist, isMasterControl } from "./index.js"
import { root } from "./omnitrix.js"
import { alienColorsMatrix, playlistMatrix } from "./playlist.js"

let auxiliaryTextTimeout = 0

// Text Elements
const alienName = document.querySelector("#alienName")
const playlist = document.querySelector("#playlist")

export const changeBackColor = (isTransforming = true) => {
    root.style.setProperty("--background-color", isTransforming == true ? alienColorsMatrix[currentPlaylist][currentAlienId] : "blueviolet")
}

export const showAuxiliaryText = (textType) => {
    if (textType == "playlist") {
        playlist.innerText = "Playlist " + (currentPlaylist + 1)
    } else if (textType == "masterControl") {
        playlist.innerText = `Master Control ${isMasterControl ? "ON" : "OFF"}`
    } else if (textType == "selfDestruct") {
        playlist.innerText = `Self-Destruct Set to 1 Minute`
    } else if ((textType = "removeSelfDestruct")) {
        playlist.innerText = `Self-Destruct Cancelled`
    }

    clearTimeout(auxiliaryTextTimeout)

    auxiliaryTextTimeout = setTimeout(() => {
        playlist.innerText = ""
    }, 2000)
}

export const showAlienName = () => {
    alienName.innerText = playlistMatrix[currentPlaylist][currentAlienId]
}

export const hideAlienName = () => {
    alienName.innerText = ""
}
