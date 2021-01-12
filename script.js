  // API
$.ajax({
  url: 'https://randomuser.me/api/?results=15',
  dataType: 'json',
  success: function (data) {
  $('.results').html('');
  document.getElementById("controls").setAttribute("class","wide");
  
  
  // Формируем таблицу
  var tableHead = document.getElementById("myTable");
  var rowHead = tableHead.insertRow(0);
  
  var cellHead1 = rowHead.appendChild(document.createElement('th'));
  var cellHead2 = rowHead.appendChild(document.createElement('th'));
  var cellHead3 = rowHead.appendChild(document.createElement('th'));
  var cellHead4 = rowHead.appendChild(document.createElement('th'));
  var cellHead5 = rowHead.appendChild(document.createElement('th'));
  var cellHead6 = rowHead.appendChild(document.createElement('th'));
  
  cellHead1.innerHTML = "Name";
  cellHead2.innerHTML = "Picture";
  cellHead3.innerHTML = "Location";
  cellHead4.innerHTML = "Email";
  cellHead5.innerHTML = "Phone";
  cellHead6.innerHTML = "Reg date";
  
  var person;
  for (var j = 0; j < data.results.length; j++) {
    person = {
      name: data.results[j].name.first + " " + data.results[j].name.last,
      picture: '<img src="' + data.results[j].picture.thumbnail + '" data-tooltip="' + data.results[j].picture.large + '">',
      location: data.results[j].location.state + ", " + data.results[j].location.city,
      email:  data.results[j].email,
      phone: data.results[j].phone,
      regDate: new Date(data.results[j].registered.date).toLocaleDateString(),
    };
    
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = person.name,
    cell2.innerHTML = person.picture,
    cell3.innerHTML = person.location;
    cell4.innerHTML = person.email,
    cell5.innerHTML = person.phone,
    cell6.innerHTML = person.regDate;
  }
  },
});
  
function tableSearch() {
  var phrase = document.getElementById('search-text');
  var table = document.getElementById('myTable');
  var regPhrase = new RegExp(phrase.value, 'i');
  var flag = false;
  for (var i = 1; i < table.rows.length; i++) {
    flag = false;
    flag = regPhrase.test(table.rows[i].cells[0].innerHTML);
    if (flag) {
      table.rows[i].style.display = "";
      table.rows[i].setAttribute("id","yes");
    } else {
      table.rows[i].style.display = "none";
      table.rows[i].setAttribute("id","");
    }
  }
  
  if (!document.getElementById('yes')) {
    document.getElementById("message").innerHTML = "Sorry, no matches in user list. Please, check the request.";
  }
    
  }
  

function resetSearch() {
  document.getElementById('search-text').value = '';
  var table = document.getElementById('myTable');
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].style.display = "";
    table.rows[i].setAttribute("id","yes");
  }
  document.getElementById("message").innerHTML = "";
}

let tooltipElem;

document.onmouseover = function(event) {
  let target = event.target;

  // если у нас есть тултип
  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml) return;

  // создадим элемент для тултипа

  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = '<img src="' + tooltipHtml + '">';
  document.body.append(tooltipElem);

  // спозиционируем его сверху от аннотируемого элемента
  let coords = target.getBoundingClientRect();

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0; // не заезжать за левый край окна

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
  top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
};

document.onmouseout = function(e) {

  if (tooltipElem) {
  tooltipElem.remove();
  tooltipElem = null;
  }

};
