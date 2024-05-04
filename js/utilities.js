const readBlogs = () => {
  window.location.assign('http://127.0.0.1:5500/blogs.html');

}


const loadData = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await response.json();
  // console.log(data.data[0].category);
  showButtons(data);
}
const showButtons = (data) => {
  const dynamicBtn = document.getElementById('dynamicBtn');
  dynamicBtn.innerHTML = `
      <button  onclick="showAll(${data?.data[0]?.category_id})" class="hover:bg-red-600 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold                    text-white">${data?.data[0]?.category}</button>
      <button onclick="showAll(${data?.data[1]?.category_id})" class="hover:bg-red-600 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[1]?.category}</button>
      <button onclick="showAll(${data?.data[2]?.category_id})" class="hover:bg-red-600 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[2]?.category}</button>
      <button onclick="showAll(${data?.data[3]?.category_id})" class="hover:bg-red-600 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[3]?.category}</button>`;

}

loadData();

// all btn show data

const showAll = async (category_id = '1000') => {
  let cardData = [];
 
  let isEmpty = false;
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
  const data = await response.json();
  sortByviews(data);
  // console.log(data.data);
  

  const cardDiv = document.getElementById('cardContainer')
  // to prevent multiple clicks
   cardDiv.textContent = '';
   errorDiv.textContent='';

     

  if (data.status) {
    cardData = data.data;


    cardData?.forEach(card => {
      // console.log(card);
      
      const singleDiv = document.createElement('div')


      singleDiv.innerHTML = ` <div>

            <div class="">
                    <img class="rounded-md h-60 w-96" src="${card.thumbnail}" alt="">
                        <div class="text-white font-bold text-end relative bottom-10 pe-10 rounded-sm">${card.others?.posted_date ? (card.others?.posted_date / 60) / 60 : ""}</div>
                </div>
             <div class="space-y-2 flex gap-3 pt-4">
             <img class="rounded-full w-14 h-14 mt-5 " src="${card.authors[0].profile_picture}" alt="">
            <div class="flex-1">
              <h1 class="text-2xl font-semibold">${card.title}</h1>
             <div id="blueVerified" class="flex gap-4">
            <p>${card.authors[0].profile_name}</p>
            <div> ${card.authors[0]?.verified ? "<i class='fa-solid fa-certificate'></i>" : ""}</div>
           </div>  
           <p>${card.others?.views}</p>
           
            </div>
            </div>
            </div>`
      // <i class="fa-solid fa-certificate"></i>
      cardDiv.appendChild(singleDiv);

      console.log(card)


    });

  }
  else {
    const errorDiv = document.getElementById('errorDiv')


    errorDiv.innerHTML = `  <div  class="flex justify-center align-center">
        <img class="" src="resources/Icon.png" alt="">
        
      </div>
      <h3 class="text-center text-4xl font-bold">Opps ,There is no data available</h3>  `



  }
  

}
showAll();

const sortByviews = (data) =>{

// console.log(data.data);
const sortData =data.data.map(view => data.data.others?.views)

console.log(sortData);
}






