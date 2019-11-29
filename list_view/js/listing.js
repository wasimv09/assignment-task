(function(){    

    fetch('../data/data.json')
    .then(response => {
        response.json().then(data => {
            if (data.length > 0){
                displayResults(data, 'title');
            }            
        })
    });

    let searchInput = document.getElementById('search-data');
    searchInput.addEventListener('keyup', function(){
        
        let dataUl = document.getElementById('raw-data'),
            dataList = dataUl.getElementsByTagName('li');
            
        for(let i = 0; i < dataList.length; i++){
            let listInnerText = dataList[i].getElementsByTagName("p")[0];
                
            if (listInnerText.innerHTML.toLowerCase().indexOf(searchInput.value.toLowerCase()) == -1) {
                dataList[i].style.display = "none";              
            } else {
                dataList[i].style.display = "";
            }
        }
    });
    
    
    let optionList = document.getElementById('option-list');
    optionList.addEventListener('change', function(){
        fetch('../data/data.json')
        .then(response => {
            response.json().then(data => {
                if (data.length > 0){
                    displayResults(data, optionList.value);                
                }            
            })
        });
    });

    function displayResults(results, optionValue) {
        let rawData = '';
        results.forEach((result, key) => {
            var search_tital = eval('result.'+ optionValue);
        
           rawData += `<li class="list-group-item"><span class="list-badge badge badge-primary">${key + 1}</span> <p>${search_tital}</p>
                    <span class="btn btn-primary btn-detail" type="button" data-toggle="collapse" data-target="#collapse${key}"
                    aria-expanded="false" aria-controls="collapse${key}">View Details</span>`;
                    
            rawData += `<div id="collapse${key}" class="collapse table-responsive">
                            <table class="table table-bordered">
                                <thead class="table-info">
                                    <tr>${Object.keys(results[0]).map(key=>{
                                            return '<td>'+key+'</td>';
                                        }).join('')}
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>${result.type.split(':')[1]}</td>
                                        <td>${result.title}</td>
                                        <td>${result.accesslevel}</td>
                                        <td>${result.accrualperiodicity}</td>
                                        <td>${result.contactpoint_type.split(':')[1]}</td>
                                        <td>${result.contactpoint_fn}</td>
                                        <td>${result.contactpoint_hasemail.split(':')[1]}</td>
                                        <td>${result.description}</td>
                                        <td>${result.identifier}</td>
                                        <td>${result.modified}</td>
                                        <td>${result.publisher_type.split(':')[1]}</td>
                                        <td>${result.publisher_name}</td>
                                        <td>${Object.keys(results[0].spatial).map(function (key) {
                                                return key +" : " + results[0].spatial[key];
                                            }).join('</br>')}
                                        </td>
                                        <td>${result.temporal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div></li>`;
        });
        document.getElementById('raw-data').innerHTML = rawData;
    }

})();

