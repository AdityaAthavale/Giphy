let giphyKey = "x7rSwvVS57OlUAeop34M0FalVWimD9bU"
let topics = ["Dog", "Cat", "Tiger", "Peacock", "Deer"]

class CardData {
    imageURL = ""
    rating = ""
    constructor(image, ratingStr) {
        this.imageURL = image
        this.rating = ratingStr
    }
}

//Get call back when document loading is finished.
$(document).ready(function() {
    addButtons()
    $('#addTopicButton').click(function() {
        showAddButtonModel()
    })
})

function addButtons() {
    for(let i=0; i<topics.length; i++) {
        // <button type="button" class="btn btn-success">Success</button>
        let button = $('<button>')
        button.addClass('btn')
        button.addClass('btn-success')
        button.text(topics[i])
        button.addClass('animalButton')
        button.click(animalButtonClicked)
        $('#buttonContainer').append(button)
    }
}

function animalButtonClicked(event) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search",
        method: 'GET',
        data: {
            "api_key": giphyKey,
            "q": event.target.textContent,
            "limit": 10
        }
    }).then(function(response) {
        let column = $('<div>')
        column.addClass('col-md-12')
        for(let i=0; i<response.data.length; i++) {
            let imageData=response.data[i]
            createCard(new CardData(imageData.images.fixed_width_small_still.url, imageData.rating), column)
        }

        let row = $('<div>')
        row.addClass('row')
        row.append(column)
        $('#gifContainer').prepend(row)
    })
}

function createCard(cardData, column) {
    let card = $('<div>')
    card.addClass('card')

    let cardImage = $('<img>')
    cardImage.addClass('card-img-top')
    cardImage.attr('src', cardData.imageURL)
    card.append(cardImage)

    let cardBody = $('<div>')
    cardBody.addClass('card-body')
    cardBody.text(cardData.rating)
    card.append(cardBody)

    column.append(card)
}

function showAddButtonModel() {
    $('#categoryTextField').val("")
    $('#newCategoryModal').modal(); 
    $('#addButton').click(function() {
        let newCategoryText = $('#categoryTextField').val()
        if (newCategoryText != "") {
            let button = $('<button>')
            button.addClass('btn')
            button.addClass('btn-success')
            button.addClass('animalButton')
            button.text(newCategoryText)
            button.click(animalButtonClicked)
            $('#buttonContainer').append(button)
        }
        $('#newCategoryModal').modal('toggle')
    })
}