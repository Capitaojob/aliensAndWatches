import { currentAlienId, currentPlaylist } from "./index.js"
import { root } from "./omnitrix.js"
import { alienColorsMatrix, playlistMatrix } from "./playlist.js"

let playlistTimeout = 0

// Text Elements
const alienName = document.querySelector("#alienName")
const playlist = document.querySelector("#playlist")

export const changeBackColor = (isTransforming = true) => {
    root.style.setProperty("--background-color", isTransforming == true ? alienColorsMatrix[currentPlaylist][currentAlienId] : "blueviolet")
}

export const showPlaylist = () => {
    playlist.innerText = "Playlist " + (currentPlaylist + 1)

    clearTimeout(playlistTimeout)

    playlistTimeout = setTimeout(() => {
        playlist.innerText = ""
    }, 2000)
}

export const showAlienName = () => {
    alienName.innerText = playlistMatrix[currentPlaylist][currentAlienId]
}

export const hideAlienName = () => {
    alienName.innerText = ""
}
