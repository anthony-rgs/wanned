class TextDialogue{
    constructor(text = [], choices = []){
        this.text = text || []
        this.message = null
        this.isEnterPressed = function(e){
            if (e.key === "Enter"){
                return true
            }else{
                return false
            }
        }
        this.enter = window.addEventListener('keypress', this.isEnterPressed)
        this.isHide = false
        this.parent = document.querySelector('body')
        this.child = document.getElementById("fog")
        this.choices = choices
        

    }

    createMessage(){
        this.message = document.createElement("div")
        this.choicesElement = document.createElement("div")
        this.choicesElement.classList.add("choicesElement")       

        this.message.classList.add("TextDialogue")
        if(this.enter){
            // on passe a l'index suivant
            this.text.shift()
        }
        this.choicesElement.innerHTML = (`
            <ul>
                ${this.choices.map((choice) => ( `<li>${choice}</li>`))}
            </ul>
        `)
        this.message.innerHTML = (`
        <p>${this.text}</p>
        ${this.choicesElement}
        `)
        
        
        this.text.shift()
    }

    show(){
        if(this.isHide){
            this.message.classList.add("TextDialogue")
        }
    }

    hide(){
        this.isHide = true
        this.message.classList.remove()
    }

    onChoice(callback){
        this.choicesElement
    }
    

    init(){
        this.createMessage()
        this.parent.insertBefore(this.message, this.child)
    }

}

export default TextDialogue