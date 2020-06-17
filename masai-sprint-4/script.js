var userArr = [{ name: "user1", pw: "1" }, { name: "user2", pw: "2" }, { name: "user3", pw: "3" }]
localStorage.setItem("users", JSON.stringify(userArr))
var loginUser = []
var btn = document.getElementById('loginbtn')
btn.addEventListener('click', loginDetails)

function loginDetails() {
    event.preventDefault()
    var name = document.getElementById("name").value
    var pw = document.getElementById("pw").value
    if (name === "admin") window.location.href = "admin.html"
    else {
        var day = new Date()
        var time = new Date()
        var user = {
            name: name,
            pw: pw,
            day: day.toDateString(),
            time: time.toLocaleTimeString()
        }
        var arr = localStorage.getItem("loginusers") || "Empty"

        if (arr === "Empty") {
            loginUser.push(user)
        }
        else if (arr !== "Empty") {
            arr = JSON.parse(arr)
            loginUser = arr
            loginUser.push(user)
        }

        localStorage.setItem("loginusers", JSON.stringify(loginUser))
        window.location.href = "user.html"
    }

}