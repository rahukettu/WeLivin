const baseUrl = 'https://api.jamendo.com/<version>/<entity>/<subentity>/?<api_parameter>=<value>'
const requestUrl = 'https://api.jamendo.com';
const client_id = YOUR_API_KEY;
const clientSecret = YOUR_CLIENT_SECRET;


let imagesize = 300;
let audioformat = 'mp32';




searchform.addEventListener('submit', event => {
  event.preventDefault();
  
  const artistName = document.querySelector('#artist').value;
  const albumName = document.querySelector('#album').value;
  const tags = document.querySelector('#tag').value;

  getArtist(artistName);
  getAlbum(artistName);
  getTrack(tags);
});

function getArtist(artistName) {

  fetch(`https://api.jamendo.com/v3.0/artists/?client_id={}&format=jsonpretty&name=`+artistName)
    .then(response => response.json())
    .then(data => {
      appendDataToTable(data.results);
    })
    .catch(error => {
      console.error('Error fetching artist:', error);
    });
}

function getAlbum(albumName) {

  fetch(`https://api.jamendo.com/v3.0/albums/?client_id={}c9&format=jsonpretty&name=`+albumName)
    .then(response => response.json())
    .then(data => {
      appendDataToTable(data.results);
    })
    .catch(error => {
      console.error('Error fetching album:', error);
    });
}

function getTrack(tags) {

  fetch(`https://api.jamendo.com/v3.0/albums/?client_id={}&format=jsonpretty&limit=25&`+tags+`&include=musicinfo&groupby=artist_id`)
    .then(response => response.json())
    .then(data => {
      appendDataToTable(data.results);
    })
    .catch(error => {
      console.error('Error fetching tracks:', error);
    });
}


function appendDataToTable(results) {
  const tbody = document.querySelector('#resultTable tbody');
  tbody.innerHTML = ''; // Clear previous data

  if (results && results.length > 0) {
    results.forEach(result => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td></td>
        <td>${result.id}</td>
        <td>${result.name}</td>
        <td>${result.website}</td>
        <td>${result.joindate}</td>
        <td>${result.shorturl}</td>
        <td>${result.shareurl}</td>
      `;
      tbody.appendChild(row);
    });
  } else {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="7">No results found</td>';
    tbody.appendChild(row);
  }
}