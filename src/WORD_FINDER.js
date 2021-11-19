var sangListe = document.getElementById("listeAvSanger");

window.addEventListener("keypress", function(key){
    if(key.keyCode == 13) {
        sokOrd(document.getElementById("sokeBar").value);
    }
});

function sokOrd(ordet){
    let antallSanger = 0;
    document.getElementById("ordetSomBleSagt").innerHTML = ordet;
    let ord = new RegExp(ordet, 'ig');
    
    


    for (let i = 0; i < sangListe.childElementCount; i++) {
        

        if (document.getElementById("tittel").innerText.includes("Kanye")){
            var navn = kanyeSanger[i].navn; 
            var lyrics = kanyeSanger[i].lyrics;
            var album = tallTilAlbum(kanyeSanger[i].album);
            var spotify = "<div>" + kanyeSanger[i].spotify + "</div>";
        }
        else{
            var navn = beatlesSanger[i].navn; 
            var lyrics = beatlesSanger[i].lyrics;
            var album = tallTilAlbum(beatlesSanger[i].album);
            var spotify = "<div>" + beatlesSanger[i].spotify + "</div>";
    
        }
        let sang = sangListe.children[i];
        
        if (ordet === ""){

            sang.style.display = "flex";
            sang.innerHTML = "<h3>" + navn + "</h3>" + album + spotify + lyrics;
            document.getElementById("antallSanger").innerHTML = 0;
            document.getElementById("ordetSomBleSagt").innerHTML = "_";
        }
        else if (sang.innerText.toLowerCase().includes(ordet.toLowerCase(), 0)){
            sang.style.display = "flex";
            sang.innerHTML = "<h3>" + navn.replace(ord, "<span class='rod'>" + ordet + "</span>") + "</h3>" + album + spotify + lyrics.replace(ord, "<span class='rod'>" + ordet + "</span>");
            antallSanger +=1;
            document.getElementById("antallSanger").innerHTML = antallSanger;
        }
        else{
            sang.style.display = "none";
            sang.innerHTML = "<h3>" + navn + "</h3>" + album + spotify + lyrics;
            antallSanger += 0;
            document.getElementById("antallSanger").innerHTML = antallSanger;
        }
    }
    document.getElementById("antallSagninger").innerHTML = document.getElementsByTagName("span").length - 3;//FIKS VERDIEN
}

function vis(elementet){
    let popupLyrics = document.createElement("div");
    popupLyrics.setAttribute('onclick', 'fjern(this)');
    popupLyrics.id = "storLyricsEl";
    document.body.appendChild(popupLyrics);


    popupLyrics.innerHTML = elementet.innerHTML;

    
    
    let spotifyDiv = document.createElement("iframe");
    spotifyDiv.setAttribute("src", "https://open.spotify.com/embed/track/"+popupLyrics.children[2].innerText);
    spotifyDiv.setAttribute("frameborder", 0);
    spotifyDiv.setAttribute("allowtransparency", "true");
    spotifyDiv.setAttribute("allow", "encrypted-media")
    popupLyrics.replaceChild(spotifyDiv, popupLyrics.children[2]);
    
    popupLyrics.children[1].style.display = "none";
    
    
    popupLyrics.innerHTML = popupLyrics.innerHTML.replaceAll("  ", "<br>");
}

function fjern(){
    document.body.children[4].animate([
        { transform: "scale(0)"},
    ], {
        duration: 800,
        iterations: 1,
    });
    setTimeout(() => {document.body.removeChild(document.body.children[4])}, 800);
}

function tallTilAlbum(tallet){
    if (document.getElementById("tittel").innerText.includes("Kanye")){
        var img = "<img src='bilder/kanyeAlbum/"+tallet+".jpeg' alt='ye'>";
    }
    else {
        var img = "<img src='bilder/beatlesAlbum/"+tallet+".jpeg' alt='Beatles'>";
    }
    return img;
}

//str.charAt(0).toUpperCase() + str.slice(1);
//$('.rod').css('background-color', 'whitesmoke');