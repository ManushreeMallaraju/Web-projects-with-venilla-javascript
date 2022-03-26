const form = document.getElementById('form');
const search = document.getElementById('search');
const more = document.getElementById('more');
const result = document.getElementById('result');

const apiURL = 'https://api.lyrics.ovh'

// Search by song or artists.. - interact with API
async function searchSongs(term) {

    // fetch(`${apiURL}/suggest/${term}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data));

    const response = await fetch(`${apiURL}/suggest/${term}`); //awaiting the response from the fetch call..
    const data = await response.json(); // this returns a promise as well so need to await this..

    showData(data);
}

// Show song and artist in DOM
function showData(data) {

    //let output = '';

    // One WAY: take the data, has an array called data(which has 15 results) create a list item for each one add to a variable..
    // data.data.forEach(song => {
    //     output += `
    //     <li>
    //         <span><strong>${song.artist.name}</strong> - 
    //         ${song.title}</span>
    //         <button class="btn" data-artist="${song.artist.name} data-songtitle="${song.title}">Get Lyrics</button> 
    //         </li>
    //     `;
    // });

    // result.innerHTML = `
    // <ul class="songs">
    // ${output}
    // </ul>`;

    // NOTE: Second way: map instead for forEach and join to turn it to a string.. 
    result.innerHTML = `
    <ul class="songs">
        ${data.data.map(song => `
        <li>
            <span><strong>${song.artist.name}</strong> - 
            ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name} data-songtitle="${song.title}">Get Lyrics</button> 
            </li>
        `)
            .join('') // join each item
        }
    </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    }
    else {
        more.innerHTML = '';
    }
}

// Get prev and next results from API
async function getMoreSongs(url) {

    //NOTE: Used this concatenated url to log and get temporory access to the domain
    // const concatenated = `https://cors-anywhere.herokuapp.com/${url}`;
    // console.log(concatenated);
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await response.json();

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

