var globalData = {}
var div1 = document.getElementById('container1')
var div2 = document.getElementById('container2')
var div3 = document.getElementById('container3')
var div4 = document.getElementById('container4')

window.addEventListener('load', function () {
    var page = new URLSearchParams(location.search)
    var title = page.get("t") || movieTitle
    movieTitle = title
    if (movieTitle != "") {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://www.omdbapi.com/?i=tt3896198&apikey=48ad96b6&t=" + title + "&plot=full")
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
                console.log(data)
                display(globalData)
            }
        }
        xhr.onerror = function () {
            div1.textContent = "Sorry URL doesn't exist!"
        }
    }
})

function display(data) {
    for (key in data) {
        if (key === "Poster") {
            var img = document.createElement('img')
            img.src = data.Poster
            img.alt = "Sorry Image not found!"
            div1.append(img)
        }
        else {

            if (key === "Title") {
                var div = document.createElement('div')
                div.id = 'item1'
                div.textContent = data[key]
                div2.append(div)
            }
            if (key === "Year") {
                var div = document.createElement('div')
                div.id = 'item2'
                div.textContent = key + ":" + " " + data[key]
                div2.append(div)
            }
            if (key === "Genre") {
                var div = document.createElement('div')
                div.id = 'item3'
                div.textContent = key + ":" + " " + data[key]
                div2.append(div)
            }
            if (key === "Runtime") {
                var div = document.createElement('div')
                div.id = 'item4'
                div.textContent = key + ":" + " " + data[key]
                div2.append(div)
            }
            if (key === "Rated") {
                var div = document.createElement('div')
                div.id = 'item5'
                div.textContent = key + ":" + " " + data[key]
                div2.append(div)
            }
            if (key === "Released") {
                var div = document.createElement('div')
                div.id = 'list1'
                div.textContent = key + ":" + " " + data[key]
                div4.append(div)
            }
            if (key === "Director") {
                var div = document.createElement('div')
                div.id = 'list2'
                div.textContent = key + ":" + " " + data[key]
                div4.append(div)
            }
            if (key === "Writer") {
                var div = document.createElement('div')
                div.id = 'list3'
                div.textContent = key + ":" + " " + data[key]
                div4.append(div)
            }
            if (key === "Awards") {
                var div = document.createElement('div')
                div.id = 'list4'
                div.textContent = key + ":" + " " + data[key]
                div4.append(div)
            }
            if (key === "Actors") {
                var div = document.createElement('div')
                div.id = 'list5'
                div.textContent = key + ":" + " " + data[key]
                div4.append(div)
            }
            if (key === "Plot") {
                var div = document.createElement('div')
                div.id = 'list6'
                div.textContent = key + ":" + " " + data[key]
                div4.append(div)
            }
            if (key === "Ratings") {
                var div11 = document.createElement('div')
                var div22 = document.createElement('div')
                div11.id = 'i1'
                div22.id = 'i2'
                var div33 = document.createElement('div')
                var div44 = document.createElement('div')
                div33.id = 'i3'
                div44.id = 'i4'
                div11.textContent = data[key][0].Value
                div22.textContent = data[key][1].Value
                div33.textContent = data[key][0].Source
                div44.textContent = data[key][1].Source
                div3.append(div11, div22, div33, div44)
            }

        }

    }

}






