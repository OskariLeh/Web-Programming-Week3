let table = document.querySelector("tbody")
populateTable()

async function populateTable() {
    const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
    const populatePromise = await fetch(url)
    const populateJSON = await populatePromise.json()
    const labelArray = Object.values(populateJSON.dataset.dimension.Alue.category.label)
    const populationArray = populateJSON.dataset.value


    labelArray.forEach((label, index) => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")

        td1.innerText = label
        td2.innerText = populationArray[index]

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        table.appendChild(tr)
    })
    addEmployment()
}

async function addEmployment() {
    const url = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    const employmentPromise = await fetch(url)
    const employmentJSON = await employmentPromise.json()
    const employmentArray = employmentJSON.dataset.value
    
    employmentArray.forEach((employed, index) => {
        table.rows.item(index).childNodes[2].innerText = employed
        let intEmployed = parseInt(employed)
        let intPopulation = parseInt(table.rows.item(index).childNodes[1].innerText)
        let employmentPercent =  (intEmployed / intPopulation * 100).toFixed(2)
        if (employmentPercent > 45) {
            table.rows.item(index).classList.add("green")
        } if (employmentPercent < 25) {
            table.rows.item(index).classList.add("red")
        }
        table.rows.item(index).childNodes[3].innerText = employmentPercent + "%"
    })
}