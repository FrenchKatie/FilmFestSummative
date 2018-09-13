var data;
// ----------DOM QUERIES----------

var anchor = document.getElementById('anchor');

// Film data containers

var filmImg = document.getElementsByClassName('film-image');
var filmTitle = document.getElementsByClassName('film-title');
var filmDirector = document.getElementsByClassName('film-director');

// -------------------------------

$.ajax({
    type: 'GET',
    url: '/data/film-data.json',
    dataType: 'json',
    success:function(jsonData){
        data = jsonData;
        console.log(jsonData);
        createContainers();
    },
    error:function(error){
        console.log('ERROR');
        console.log(error);
    }
});

function createContainers(){
    for (var i = 0; i < data.length; i++) {
        var filmContainer = document.createElement('div');
        filmContainer.setAttribute('class','film-ctnr');
        filmContainer.innerHTML = '<img src="" class="film-image" style="width: 200px"><span class="film-title"></span><span class="film-director"></span>';
        anchor.after(filmContainer);
        initData(i);
    }
}

function initData(i){
    filmImg[0].setAttribute('src', data[i].images[0]);
    filmTitle[0].innerHTML = data[i].title;
    filmDirector[0].innerHTML = data[i].director[0];
    
}