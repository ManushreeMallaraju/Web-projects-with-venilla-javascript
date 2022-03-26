const form = document.getElementById('form');
const search = document.getElementById('search');
const more = document.getElementById('more');
const result = document.getElementById('result');

const apiURL = 'https://api.lyrics.ovh'

// Show song and artist in DOM
function showData(data) {

}

// Search by song or artists.. - interact with API
async function searchSongs(term) {

    // fetch(`${apiURL}/suggest/${term}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data));

    const response = await fetch(`${apiURL}/suggest/${term}`); //awaiting the response from the fetch call..
    const data = await response.json(); // this returns a promise as well so need to await this..

    showData(data);
}

// Event Listeners: 
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim(); // to get the value of the input field..

    if (!searchTerm) {
        alert('Please type in a search term')
    }
    else {
        searchSongs(searchTerm);
    }
})

