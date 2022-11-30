// partie req

const httpReq = new XMLHttpRequest()

httpReq.open("GET", "../listeDeMot.txt")

httpReq.onload = () => {
    ready()
}

httpReq.send()

// partie html

function ready() {

    const champ = document.getElementById("champ")

    champ.addEventListener("input", () => {

        debounce(LiClick, champ)

    })

}

function LiClick() {

    const champ = document.getElementById("champ")
    const ul = document.getElementById("ul")
    const res = httpReq.response.split("\r\n")

    if (champ.value.length >= 3) {
        const filtre = res.filter(el => el.startsWith(champ.value)).slice(0, 10)
        console.log(filtre);

        if (filtre.length > 0) {
            ul.style.display = "block"
            ul.innerHTML = ""
        }

        for (const element of filtre) {
            const li = document.createElement("li")
            li.innerText = element

            li.addEventListener("click", () => {
                champ.value = li.innerText


                debounce(LiClick, champ)
            })

            ul.appendChild(li)
        }

    }
    else {
        ul.style.display = "none"
        ul.innerHTML = ""
    }

}

function debounce(func, champ) {
    const inter = setTimeout(() => {
        func()
        console.log(true);
    }, 500)

    champ.addEventListener('input', () => {
        clearTimeout(inter)
    })
} 