const url = "https://crudcrud.com/api/830883742aec40ed8e4c5a562cba8cc9/noteBook";
var total_books = 0, show_books = 0;
window.addEventListener('DOMContentLoaded', () => {

    axios.get(url)
        .then((response) => {
            // console.log(response.data);

            for (let i = 0; i < response.data.length; i++) {
                displayOnScreen(response.data[i]);

            }
        })
        .catch((err) => {
            console.log(err);
        });
})

function handleFormSubmit(event) {
    event.preventDefault();
    const nbDetails = {
        title: event.target.ttl.value,
        desc: event.target.desc.value,
    };
   
    axios.post(url, nbDetails)
        .then((response) => {
            //  console.log(response.data);


            displayOnScreen(response.data);


        })
        .catch((err) => {
            console.log(err);
        });

    document.getElementById("ttl").value = "";
    document.getElementById("desc").value = "";

}

function displayOnScreen(nbDetails) {
    const list = document.querySelector('ul');



    const nbList = document.createElement('li');
    nbList.className = 'nbList list-group-items p-2 ';

    nbList.innerHTML = `<h5>${nbDetails.title}</h5> <p>${nbDetails.desc}</p>`;


    list.appendChild(nbList);



    const dlt = document.createElement('button');
    dlt.className = 'btn btn-danger';
    dlt.appendChild(document.createTextNode('Delete'));
    nbList.appendChild(dlt);

    dlt.addEventListener('click', () => {
        axios.delete(`${url}/${nbDetails._id}`);
        list.removeChild(dlt.parentNode);
    })

    list.appendChild(nbList);
    total_books++;
  //  show_books++;
   totaoBooksCount(total_books);
  
}
var x;
const search = document.getElementById("search");

search.addEventListener('keyup', (event) => {
    const enteredText = event.target.value.toLowerCase();
    const nbList = document.getElementsByClassName("nbList");
    show_books = 0;
    for (let i = 0; i < nbList.length; i++) {
        const liText = nbList[i].firstChild.textContent.toLowerCase();
        // conole.log(nbList[i]);

        if (liText.indexOf(enteredText) === -1) {
            nbList[i].style.display = 'none';
           

        }
        else {
            nbList[i].style.display='flex';
           
           // displayOnScreen(nbList[i]);
            show_books++;
          // 
            
        }

      
    }
    showBooksCount(show_books);

})

totaoBooksCount(total_books);

//showBooksCount(show_books);
function totaoBooksCount(total_books) {
    document.getElementById("total_b").innerHTML = `Total notes : ${total_books}`;
}
function showBooksCount(show_books) {
    //if(show_books===0) show_books=total_books;
    document.getElementById("show_b").innerHTML = `Showing notes : ${show_books}`;
}
