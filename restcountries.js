//https://restcountries.com/v3.1/name/{name}
let tBodyEl = document.querySelector("tbody");

axios.get("https://restcountries.com/v3.1/all").then(function (response) {  

  response.data.sort((a,b) => {
      if(a.name.common < b.name.common) { return -1; }
      if(a.name.common > b.name.common) { return 1; }
      return 0;
    });

   
       
        for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];            
            createElements(element);
        }
    
      })


      function createElements(elementParam) {
        let trElement = document.createElement("tr");
        let tdElement = document.createElement("td");
        let tdElementSec = document.createElement("td");
        let tdElementThird = document.createElement("td");
        let imgElement = document.createElement("img");
        
       let createdButton = createBtn(elementParam);
       
        tdElementThird.append(createdButton);
        imgElement.src = elementParam.flags.png;
        tdElementSec.append(imgElement);
        tdElement.innerText = elementParam.name.common;
        trElement.append( tdElementSec, tdElement, tdElementThird);
        tBodyEl.append(trElement); 
      }


      function createBtn(element) {
        let btnElement = document.createElement("input");
        btnElement.type = "button";
        btnElement.id = element.name.common;
        btnElement.className = "btn btn-primary";
        btnElement.value = "Details"
        btnElement.dataset.toggle = "modal";
        btnElement.dataset.target = "#exampleModal";
        btnElement.addEventListener('click', () =>{

            axios.get(`https://restcountries.com/v3.1/name/${btnElement.id}`).then(function (response){
                console.log(response.data[0]);
                fillModalBody(response.data[0]);

            })
        })

        return btnElement;
      }



      function fillModalBody(element) {
        let modalBody = document.getElementById("modalTbody");
        let trEl = document.createElement("tr");
        let tdEl = document.createElement("td");
        let tdElSec = document.createElement("td");
        let tdElThird = document.createElement("td");
        let tdElFourt= document.createElement("td");
        let tdElFifth = document.createElement("td");
        let tdElSixth = document.createElement("td");
        let tdElSeventh = document.createElement("td");  
        
        tdEl.innerText = element.capital[0]
        tdElSec.innerText = element.currencies[Object.keys(element.currencies)[0]].name;
        // tdElSec.innerText = Object.values(element.currencies).map(el => el.name);

        console.log(Object.values(element.currencies).map(el => el.name).join(','));
        
        tdElThird.innerText = element.population;

        tdElFourt.innerText = element.languages[Object.keys(element.languages)[0]];

        tdElFifth.innerText = element.continents[0];
        
        tdElSixth.innerText = element.translations.spa.official;

        tdElSeventh.innerText = element.subregion;

        trEl.append(tdEl, tdElSec, tdElThird, tdElFourt, tdElFifth, tdElSixth,  tdElSeventh );
        modalBody.append(trEl);
        
        closeBtn.addEventListener("click",() => {
          trEl.innerHTML = "";
        })

      }     

      let closeBtn = document.getElementById("closeModal");