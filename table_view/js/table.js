(function(){    
    //fetch all data from json
    function fetchData(){
        fetch('../data/data.json')
        .then(response => {
            response.json().then(data => {
                if (data.length > 0){
                    displayResults(data);
                }            
            })
        });
    }
    fetchData();        
    //setInterval(() => fetchData(), 50000);

    //Search Filter
    let searchInput = document.getElementById('search-data');
    searchInput.addEventListener('keyup', function(){
        
        let dataTable = document.getElementById('raw-data-body'),
            dataList = dataTable.getElementsByTagName('tr');
            
        for(let i = 0; i < dataList.length; i++){
            let listInnerText = dataList[i];                
            if (listInnerText.innerHTML.toLowerCase().indexOf(searchInput.value.toLowerCase()) == -1) {
                dataList[i].style.display = "none";              
            } else {
                dataList[i].style.display = "";
            }
        }
    });

    //function for display data
    function displayResults(results) {
        let dataHead = '',
            dataBody = '';

        dataHead +='<tr>'; 
        dataHead += `<td>#</td>`
        for (key in results[0]) {            
            dataHead += `<td>${key.split('_').join(' ')}</td>`;
        }
        dataHead +='</tr>';
        document.getElementById('raw-data-head').innerHTML = dataHead;
        
        results.forEach((result, key) => {            
            dataBody += `<tr>
                            <td>${key + 1}</td>
                            <td>${result.type.split(':')[1]}</td>
                            <td style="min-width: 350px">${result.title}</td>
                            <td>${result.accesslevel}</td>
                            <td>${result.accrualperiodicity}</td>
                            <td>${result.contactpoint_type.split(':')[1]}</td>
                            <td>${result.contactpoint_fn}</td>
                            <td>${result.contactpoint_hasemail.split(':')[1]}</td>
                            <td style="min-width: 800px">${result.description}</td>
                            <td>${result.identifier}</td>
                            <td>${result.modified}</td>
                            <td>${result.publisher_type.split(':')[1]}</td>
                            <td>${result.publisher_name}</td>
                            <td>${Object.keys(results[0].spatial).map(function (key) {
                                    return key +" : " + results[0].spatial[key];
                                }).join('</br>')}
                            </td>
                            <td>${result.temporal}</td>
                        </tr>`;
                        
        });
        document.getElementById('raw-data-body').innerHTML = dataBody; 
    }    

})();

