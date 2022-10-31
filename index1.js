
const search_user = document.getElementById("search_username_btn")
const input_username = document.getElementById("search_username")

const input_username_form = document.getElementById("input_username")
const results_username = document.getElementById("results_username")

let counter = 1;
document.getElementById("next").addEventListener("click", () => {
    
        document.getElementById("all_repo").innerHTML = ""
        counter++
        all_results( counter)
    
})
document.getElementById("prev").addEventListener("click", () => {
    if (counter > 1) {
        document.getElementById("all_repo").innerHTML = ""
        counter--
        all_results( counter)
    }

})

document.getElementById("cover").addEventListener("click", () => window.location.reload())

search_user.addEventListener("click", () => {

    if (document.getElementById("one_user").checked == true && document.getElementById("search_username").value != "") {

        document.getElementById("one_repos").classList.remove("hidden")
        document.getElementById("all_repos").classList.add("hidden")
        document.getElementById("table_body").innerHTML = ""
        document.getElementById("repo_body_table").innerHTML = ""
        fetching( counter)

    }
    else if (document.getElementById("all").checked == true && document.getElementById("search_username").value != null) {

        document.getElementById("all_repos").classList.remove("hidden")
        document.getElementById("one_repos").classList.add("hidden")
        all_results( counter)
    }
    else window.location.reload()



})
const fetching = () => {

    fetch(`https://api.github.com/users/${document.getElementById("search_username").value}`)
        .then((resolve) => resolve.json())
        .then((data) => {

            const obj = {
                name: data.name,
                username: data.login,
                avatar: data.avatar_url,
                followers: data.followers,
                following: data.following,
                nbr_repo: data.public_repos,
                link: data.html_url
            }
            document.getElementById("avatar").setAttribute("src", `${obj.avatar}`)
            const row = document.createElement("tr")
            const data_row1 = document.createElement("td")
            data_row1.innerHTML=obj.name
            data_row1.setAttribute("class","td1")
            row.append(data_row1)
            const data_row2 = document.createElement("td")
            data_row2.innerHTML=obj.username
            data_row2.setAttribute("class","td1")
            row.append(data_row2)
            const data_row3 = document.createElement("td")
            data_row3.innerHTML=obj.followers
            data_row3.setAttribute("class","td1")
            row.append(data_row3)
            const data_row4 = document.createElement("td")
            data_row4.innerHTML=obj.following
            data_row4.setAttribute("class","td1")
            row.append(data_row4)
            const data_row5 = document.createElement("td")
            data_row5.innerHTML=obj.nbr_repo
            data_row5.setAttribute("class","td1")
            row.append(data_row5)
            const data_row6 = document.createElement("td")
            const a = document.createElement("a")
            data_row6.setAttribute("class","td1")
            a.setAttribute("href",`${obj.link}`)
            a.setAttribute("target","_blank" )
            a.innerHTML = "Link"
            data_row6.append(a)
            row.append(data_row6)
            document.getElementById("table_body").append(row)
           

        }).catch((err) => location.reload())

    fetch(`https://api.github.com/users/${document.getElementById("search_username").value}/repos`)
        .then((resolve) => resolve.json())
        .then((data) => {

            for (let i = 0; i < data.length; i++) {
                const el = data[i];
                const obj = {
                    name: el.name,
                    link: el.html_url
                }
                const row = document.createElement("tr")
                const data_row1 = document.createElement("td")              
                data_row1.innerHTML = obj.name
                const data_row2 = document.createElement("td")
                const a = document.createElement("a")
                a.setAttribute("href",`${obj.link}`)
                a.setAttribute("target","_blank" )
                a.innerHTML = "Link"
                data_row2.append(a)
                row.append(data_row1)
                row.append(data_row2)
                document.getElementById("repo_body_table").append(row)
              
            }

            search_user.disabled = false;

        }).catch((err) => location.reload())

}


const all_results = (counter) => {
    document.getElementById("all_repo").innerHTML = ``
    fetch(`https://api.github.com/search/users?q=${document.getElementById("search_username").value}&per_page=10&page=${counter}`)
        .then((resolve) => resolve.json())
        .then((data) => {

    
            data.total_count>10 ? document.getElementById("pages").innerHTML = `${counter * 10}/${data.total_count} results `: document.getElementById("pages").innerHTML = `${(data.total_count)}/${data.total_count} results `
            data.items.forEach(element => {
                const obj = {
                    username: element.login,
                    link: element.html_url,
                    avatar: element.avatar_url

                }
                const row = document.createElement("tr")
                const data_row1 = document.createElement("td")
                const img = document.createElement("img")
                img.setAttribute("id","avatar_all")
                img.setAttribute("class","responsive-img materialboxed")
                img.setAttribute("src",`${obj.avatar}`)
                data_row1.append(img)
                const data_row2 = document.createElement("td")
                data_row2.innerHTML = obj.username
                const data_row3 = document.createElement("td")
                const a = document.createElement("a")
                a.setAttribute("href",`${obj.link}`)
                a.setAttribute("target","_blank" )
                a.innerHTML = "Link"
                data_row3.append(a)
                row.append(data_row1)
                row.append(data_row2)
                row.append(data_row3)
                document.getElementById("all_repo").append(row)

            })


        })
}