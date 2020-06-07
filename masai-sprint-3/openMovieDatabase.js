var globalData = {}
var globalArr = []
var div1 = document.getElementById('container1')
var div2 = document.getElementById('container2')
var div3 = document.getElementById('container3')
var movieTitle = ""

window.addEventListener('load', function () {
    var page = new URLSearchParams(location.search)
    var p = page.get("page") || 1
    var title = page.get("s") || movieTitle
    movieTitle = title
    if (movieTitle != "") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://www.omdbapi.com/?i=tt3896198&apikey=48ad96b6&s=" + title + "&page=" + p)
        xhr.send()
        xhr.onload = function () {
            if (this.status === 404) {
                div2.textContent = "Sorry page not found!"
            }
            else if (this.status <= 400) {

                var data = JSON.parse(this.response)
                globalData = {}
                for (key in data) {
                    globalData[key] = data[key]
                }
                globalArr = []
                for (var k = 0; k < data.Search.length; k++) {
                    globalArr[k] = k
                }
                sort(globalData)
            }
        }
        xhr.onerror = function () {
            div2.textContent = "Sorry URL doesn't exist!"
        }
    }
})

function search(movie) {
    div2.innerHTML = ""
    div3.innerHTML = ""
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://www.omdbapi.com/?i=tt3896198&apikey=48ad96b6&s=" + movie)
    xhr.send()
    xhr.onload = function () {
        var data = JSON.parse(this.response)
        if (this.status === 404) {
            div2.textContent = "Sorry page not found!"
        }
        else if (data.Response === "False") {
            div2.textContent = "Movie not found!"
        }
        else if (this.status <= 400) {
            globalData = {}
            for (key in data) {
                globalData[key] = data[key]
            }
            console.log("data", data.Search.length, data)
            globalArr = []
            for (var k = 0; k < data.Search.length; k++) {
                globalArr[k] = k
            }
            console.log("datain ckl", globalData)
            sort(globalData)
        }
    }
    xhr.onerror = function () {
        div2.textContent = "Sorry URL doesn't exist!"
    }
}


function swap(arr1, i, j) {
    var temp = arr1[i]
    arr1[i] = arr1[j]
    arr1[j] = temp
}

function sort(globalData) {
    var array = []
    var arrYear = []
    var len = globalData.Search.length
    for (var j = 0; j < len; j++) {
        array[j] = j
    }
    for (var i = 0; i < len; i++) {
        arrYear[i] = globalData.Search[i].Year
    }
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (arrYear[j] > arrYear[j + 1]) {
                swap(arrYear, j, j + 1)
                swap(array, j, j + 1)
            }
        }
    }
    for (var k = 0; k < globalData.Search.length; k++) {
        globalArr[k] = array[k]
    }
    display(globalData)
}

function display(data) {
    var len = data.Search.length
    for (var i = 0; i < len; i++) {
        var title = data.Search[globalArr[i]].Title
        var type = data.Search[globalArr[i]].Type
        var year = data.Search[globalArr[i]].Year
        var imdbID = data.Search[globalArr[i]].imdbID
        var divp = document.createElement('div')
        divp.id = "movieT"
        var p1 = document.createElement('p')
        var divxx = document.createElement('div')
        divxx.id = "divxx"
        var divIn1 = document.createElement('div')
        var divIn2 = document.createElement('div')
        var a = document.createElement('a')
        a.id = "a"
        var img = document.createElement('img')
        img.alt = "Sorry image not found"
        divp.textContent = title
        img.setAttribute('src', data.Search[globalArr[i]].Poster)
        a.href = "indexNext.html?t=" + title
        a.textContent = "click for more info"
        p1.textContent = "Type" + ":" + " " + type + "\n" + "Year" + ":" + " " + year + "\n" + "imdbID" + ":" + " " + imdbID
        divIn1.append(img)
        divIn2.append(divp, p1, a)
        divxx.append(divIn1, divIn2)
        div2.append(divxx)
    }
    var page = document.createElement('div')
    var j = 1
    for (var i = 0; i < Number(data.totalResults); i = i + 10) {
        var a = document.createElement('a')
        a.id = "pager"
        a.innerText = j
        a.href = "?s=" + movieTitle + "&page=" + j
        page.appendChild(a)
        j++
    }
    div3.append(page)
}

var btn = document.getElementById('btn')
btn.addEventListener('click', function () {
    var movie = document.getElementById('movieTitle').value
    movieTitle = ""
    movieTitle = movieTitle + movie
    search(movie)
})





