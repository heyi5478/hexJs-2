let dataAPI = [];

axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
.then(function(res){
  dataAPI=res.data.data;
  init();
});

//  覆蓋套票、篩選器

const ticketCard = document.querySelector(".ticketCard-area");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");

// 查無資料頁面

const cantFindarea = document.querySelector(".cantFind-area");

// 必填隱藏

// 新增套票

const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const addTicketButton = document.querySelector(".addTicket-btn");
const ticketForm = document.querySelector(".addTicket-form");

let dataLength = dataAPI.length;


  function init(Datas = dataAPI) {
    let str = "";
    Datas.forEach(function (element) {
      let li = `<li class="ticketCard">
      <div class="ticketCard-img">
          <a href="#">
              <img src="${element.imgUrl} alt="">
          </a>
          <div class="ticketCard-region">${element.area}
          </div>
          <div class="ticketCard-rank">${element.rate}
          </div>
      </div>
      <div class="ticketCard-content">
          <div>
              <h3>
                  <a href="#" class="ticketCard-name">${element.name}
                  </a>
              </h3>
              <p class="ticketCard-description">${element.description}
              </p>
          </div>
          <div class="ticketCard-info">
              <p class ="ticketCard-num"> 
                  <span><i class="fas fa-exclamation-circle"></i>
                  </span>
                  <span>剩下最後<span id="ticketCard-num"> ${element.group} </span> 組
              </p>
              <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${element.price}</span>
              </p>
          </div>
      </div>
  </li>`;
      str += li;
    });
    ticketCard.innerHTML = str;
  }
  // 覆蓋套票
  
  init(dataAPI);
  
  // 篩選地區

  regionSearch.addEventListener("change", selectRegion);
  
  function selectRegion() {
    let newData = [];
    dataAPI.forEach(function (element) {
      if (regionSearch.value == element.area) {
        cantFindarea.style.display = "block";
        newData.push(element);
        init(newData);
      } else if (regionSearch.value == "") {
        init(dataAPI);
        searchResultText.textContent = `本次搜尋共 ${dataLength} 筆資料`;
      }
    });
  }
  
  // 新增套票
  
  addTicketButton.addEventListener("click", function (e) {
    if (ticketName.value == "") {
      return;
    } else if (ticketImgUrl.value == "") {
      return;
    } else if (ticketRegion.value == "") {
      return;
    } else if (ticketPrice.value == "") {
      return;
    } else if (ticketNum.value == "") {
      return;
    } else if (ticketRate.value == "") {
      return;
    } else if (ticketDescription.value == "") {
      return;
    } else {
      alert("新增成功！");
    }
  
    let obj = {
        id: dataLength,
        name: ticketName.value,
        imgUrl: ticketImgUrl.value,
        area: ticketRegion.value,
        description: ticketDescription.value,
        group: Number(ticketNum.value),
        price: Number(ticketPrice.value),
        rate: Number(ticketRate.value)
    }
    dataAPI.push(obj);
  
    init(dataAPI);
    ticketForm.reset();
    ticketCard.scrollIntoView({ behavior: "auto", block: "end" });
    regionSearch.value = "";
  });
  