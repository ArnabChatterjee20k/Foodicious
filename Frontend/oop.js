class Card {
    constructor() {
        this.state = {
            name:null,
            image:null,
            link:null,
            content:null
        }
    }

    change_state({name=null,image=null,link=null,content=null,id=null}={}){
        this.state = {...this.state , name,image,link,content}
        return this
    }

    /**
     * 
     * @returns card-div-element
     */
    create_card() {
        let card = document.createElement("div")
        card.setAttribute("class", "card")
        card.setAttribute("id", `${this.state.id}`)

        let card_img = document.createElement("div")
        card_img.setAttribute("class", "card-img")
        let img = document.createElement("img")
        img.src = this.state.image
        img.alt = this.state.name
        card_img.append(img)
        card.append(card_img);

        let card_name = document.createElement("div")
        card_name.setAttribute("class", "card-name")
        let name_paragraph = document.createElement("p")
        name_paragraph.setAttribute("class", "card-recipe-name")
        name_paragraph.textContent = this.state.name.length > 20 ? `${this.state.name.slice(0, 20)}...` : this.state.name
        card_name.append(name_paragraph)
        card.append(card_name)

        card.childNodes.forEach((element)=>{
            element.id = this.state.id
        })
        return card
    }
}

class Recipie_Section extends Card {
    constructor(recipie_card_holder) {
        super();
        this.card_holder = document.querySelector(recipie_card_holder);
        this.cards_collection = [];
    }
    /**
     * 
     * @returns this
     */
    insertCard() {
        let card = this.create_card();
        this.cards_collection.push(this.state) // pushing the card state 
        this.card_holder.append(card)

        // getting the details of the clicked card from the this.
        card.onclick = (e)=>{
            alert(e.target.parentElement.id)
            console.log(this.cards_collection[e.target.parentElement.id])
        }
        return this // for chaining
    }
}

class Fetch_Data extends Recipie_Section {
    constructor(card_holder_div) {
        super(card_holder_div)
        this.state = []
        this.parent_key = "searchResults";
        this.child_key = "results";
        this.array_index = 0

        this.get_recipie("burger")
    }
    /**
     * 
     * @returns this
     */
    async get_recipie(query) {
        this.card_holder.innerHTML = ""
        const url = `https://api.spoonacular.com/food/search?apiKey=3300b39907ba48109dcef0b2020ac99c&query=${query}&number=10`;
        const data = await fetch(url).then((res) => res.json())
        const recipie_traversed_json = data[`${this.parent_key}`][0][`${this.child_key}`]
        recipie_traversed_json.map(({ name, image },index) => {
            this.state = {...this.state,name,image,id:index}
            this.insertCard()
        })
        return this
    }
}

class Hero_Animation {
    constructor(){
        this.play_carosouel()
        this.play_type_writer()
    }
    play_carosouel(){
        var splide = new Splide('.splide', {
            type: 'loop',
            perPage: 1,
            autoplay: true,
        });
        
        splide.mount();
    }

    play_type_writer(){
        var type = new Typed(".typing",{
            strings: ["pizza","burger","cake","biriyani","chocolates"],
            typeSpeed: 50,
            loop: true,
            backDelay: 900,
            backSpeed: 30
        })
    }
    
}

class Search_bar extends Fetch_Data{
    constructor(search_input,search_btn,query,card_holder_div) {
        super(query,card_holder_div)
        this.input = document.querySelector(search_input)
        this.btn = document.querySelector(search_btn)

        this.fetch_data()
    }

    match_pattern(data){
        let check_pattern =  /^[a-zA-Z]\S*$/ 
        /** must start with alphabet and then no white space characters */
        return check_pattern.test(data)
    }

    fetch_data(){
        this.btn.onclick = ()=>{
            const query = this.input.value
            this.match_pattern(query)?this.get_recipie(query):alert("error")
        }
    }
}
document.querySelector("body").onload = ()=>{
    // let data = new Fetch_Data(query="burger",card_holder_div=".recipie-card")
    let data = new Search_bar(".search",".search-btn",card_holder_div=".recipie-card")
    new Hero_Animation()
}


