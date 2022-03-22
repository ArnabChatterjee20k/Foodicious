let card_area = document.querySelector(".recipie-card")

let search_bar = document.querySelector(".search")

let body = document.querySelector("body")

search_bar.value = "burger"
body.onload = () => search_bar.focus()

const url = "https://api.spoonacular.com/food/search?apiKey=3300b39907ba48109dcef0b2020ac99c&query=burger&number=10"

function generate_url(query){
    return `https://api.spoonacular.com/food/search?apiKey=3300b39907ba48109dcef0b2020ac99c&query=${query}&number=10`
}

async function get_data(url){
    const data = await fetch(url)
    const parsed_data = data.json()
    return parsed_data
}

function generate_cards(url){
    card_area.innerHTML=""
    get_data(generate_url(url)).then((res)=>{
        res.searchResults[0].results.map(({ name, image }) => {
            let card = `<div class="card">
                            <div class="card-img">
                                <img src="${image}" alt="">
                            </div>
                            <div class="card-name"><p class="card-recipe-name">${name.length<20?name:name.slice(0,20)+"...."}</p></div>
                        </div>`
    
            card_area.innerHTML += card
        })
    })

}
// search_bar.addEventListener("input",(e)=>{
//     generate_cards(e.target.value)
// })