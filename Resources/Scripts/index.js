function handleOnLoad(){
    // const songUrl = "https://localhost:5001/api/song";
    const songUrl = "https://cacook7bigalplaylistapi.herokuapp.com/api/song";

    fetch(songUrl).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        setSongs(json);
        // findSongs(json)
    }).catch(function(error){
        console.log(error);
    });
}

setSongs = function(songs){
    var html = ``;
    songs.forEach((song)=>{
        html += `<div class="card col-md-4 bg-dark text-white">`;
			html += `<img src="./Resources/Images/music.jpeg" class="card-img" alt="...">`;
			html += `<div class="card-img-overlay">`;
			html += `<h5 class="card-title"><spann>`+song.title+"<h6>Favorited =</h6>"+song.favorited+`<spann></h5>`;
            html += `<button id="myBtn" class="btn btn-dark" onclick="putSong(${song.id})">☆</button>`;
            html += `<br></br>`;
            html += `<button onclick ="removeSong(${song.id})" class="btn btn-dark">Delete</button>`;
            // ☆
            html += `</div>`;
            html += `</div>`;       
    })
    document.getElementById("songs").innerHTML = html;
}


function findSongs(){
    var url = "https://www.songsterr.com/a/ra/songs.json?pattern=";
    let searchString = document.getElementById("searchSong").value;

    url += searchString;

    console.log(searchString)

    fetch(url).then(function(response) {
		console.log(response);
		return response.json();
	}).then(function(json) {
        console.log(json)
        let html = ``;
		json.forEach((song) => {
            console.log(song.title)
            html += `<div class="card col-md-4 bg-dark text-white">`;
			html += `<img src="./Resources/Images/music.jpeg" class="card-img" alt="...">`;
			html += `<div class="card-img-overlay">`;
			html += `<h5 class="card-title">`+song.title+`</h5>`;
            html += `</div>`;
            html += `</div>`;
		});
		
        if(html === ``){
            html = "No Songs found :("
        }
		document.getElementById("searchSongs").innerHTML = html;

	}).catch(function(error) {
		console.log(error);
	})
}

addSong = function(){
    // var SongUrl = "https://localhost:5001/api/song/";
    var SongUrl = "https://cacook7bigalplaylistapi.herokuapp.com/api/song";
    let songTitle = document.getElementById("song").value;

    fetch(SongUrl,{
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            Title: songTitle
        })
    })
    .then((response)=>{
        console.log(response);
        handleOnLoad();
    })
}

function putSong(favorited){
    // const putSongUrl = "https://localhost:5001/api/song/"+favorited;
    const putSongUrl = "https://cacook7bigalplaylistapi.herokuapp.com/api/song"+favorited;
    const SongFavorited = document.getElementById("edit"+favorited);

    fetch(putSongUrl,{
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            Favorited: SongFavorited
        })
    })
    .then((response)=>{
        console.log(response);
        handleOnLoad();
    })
}

function removeSong(id){
    // const deleteSongUrl = "https://localhost:5001/api/song/"+id;
    const deleteSongUrl = "https://cacook7bigalplaylistapi.herokuapp.com/api/song/"+id;

    fetch(deleteSongUrl,{
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
    })
    .then((response)=>{
        console.log(response);
        handleOnLoad();
    })
}

