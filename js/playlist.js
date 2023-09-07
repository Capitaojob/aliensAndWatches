import { storeUserAlienMatrixInLocalStorage } from "./index.js"

export const playlistMatrix = [
    ["Heatblast", "Wildmutt", "Diamondhead", "XLR8", "Grey Matter", "Four Arms", "Stinkfly", "Ripjaws", "Upgrade", "Ghostfreak"],
    ["Cannonbolt", "Wildvine", "Blitzwolfer", "Snare-oh", "Frankenstrike", "Upchuck", "Ditto", "Eye Guy", "Way Big", "Arctiguana"],
    ["Swampfire", "Echo Echo", "Humungousaur", "Jetray", "Big Chill", "Chromastone", "Brainstorm", "Spidermonkey", "Goop", "Alien X"],
    ["Lodestar", "Rath", "Nanomech", "Murk Upchuck", "Water Hazard", "Terraspin", "NRG", "Armodrillo", "AmpFibian", "Fasttrack"],
    ["Jury Rigg", "Gravattack", "Shocksquatch", "Eatle", "Clockwork", "Buzzshock", "ChamAlien", "Astrodactyl", "Crashhopper", "Toepick"],
    ["Gutrot", "Bloxx", "Feedback", "Ball Weevil", "Walkatrout", "Pesky Dust", "Mole-Stache", "The Worst", "Atomix", "Whampire"],
]

export const alienColorsMatrix = [
    ["#FFA500", "#c50727", "#4fa8b8", "#bcf7cf", "#a5ff1f", "#AAAAAA", "#32CD32", "#808080", "#8B4513", "#c6d5c0"],
    ["#FFA500", "#228B22", "#6c7e8e", "#999868", "#999868", "#3a6212", "#EEEEEE", "#999868", "#FF0000", "#87CEEB"],
    ["#228B22", "#EEEEEE", "#8B4513", "#5a0c1b", "#056491", "#2d2258", "#8B4513", "#2134db", "#00FF00", "#000000"],
    ["#402623", "#d15424", "#4d6679", "#3a6212", "#901b30", "#837e40", "#2e4844", "#ebd50f", "#66b4ec", "#5ba3e1"],
    ["#ba3758", "#8a3418", "#ebd50f", "#19133d", "#9b701b", "#1e1908", "#a2a9d1", "#9e3829", "#879f46", "#ada425"],
    ["#6e6faa", "#ce1a49", "#060606", "#e6c434", "#4da3c1", "#9fd7dd", "#a76846", "#c39f13", "#c2d4c7", "#c3d5c8"],
]

export const generateFirstPlaylist = () => {
    let generatingUserAlienMatrix = []
    for (let i = 0; i < 10; i++) {
        let newAlien
        do {
            newAlien = playlistMatrix[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 9)]
        } while (generatingUserAlienMatrix.includes(newAlien))
        generatingUserAlienMatrix.push(newAlien)
    }
    storeUserAlienMatrixInLocalStorage(generatingUserAlienMatrix)
    return generatingUserAlienMatrix
}
