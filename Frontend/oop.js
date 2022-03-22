class Card{
    constructor(){
        this.current_number_of_cards = 0;
        this.cards = ++this.current_number_of_cards ;
    }
    create_card(name,image){
        let card = document.createElement("div")
        card.setAttribute("class","card")

        let card_img = document.createElement("div")
        card_img.setAttribute("class","card-img")
        let img = document.createElement("img")
        img.src = image
        img.alt = name
        card_img.append(img)
        card.append(card_img);
        
        let card_name = document.createElement("div")
        card_name.setAttribute("class","card-name")
        let name_paragraph = document.createElement("p")
        name_paragraph.setAttribute("class","card-recipe-name")
        name_paragraph.textContent = name
        card_name.append(name_paragraph)
        card.append(card_name)

        return card
    }
}

class Recipie_Section extends Card{
    constructor(recipie_card_area_class){
        super();
        this.card_area = document.querySelector(recipie_card_area_class);
        this.cards = [];
    }
    
    insertCard(name,image){
        let card = this.create_card(name=name,image=image);
        this.cards.push({index:this.current_number_of_cards,card})
        this.card_area.append(card)

        return this // for chaining
    }
}

class Fetch_Data extends Recipie_Section {
    constructor(query,body_area){
        super(body_area); // calling the constructor of the Recipie_Section
        this.url =  `https://api.spoonacular.com/food/search?apiKey=3300b39907ba48109dcef0b2020ac99c&query=${query}&number=10`;
        this.state = []
        this.parent_key = "searchResults";
        this.child_key = "results";
        this.array_index = 0

        this.get_recipie()
    }

    async get_recipie(){
        const data = await fetch(this.url).then((res)=>res.json())
        data.searchResults[0].results.map(({name,image})=>{
            this.insertCard(name,image)
        })
        return this
    }
}

let data = new Fetch_Data("burger",".recipie-card")