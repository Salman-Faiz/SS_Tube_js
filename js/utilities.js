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
    <button id="0" onclick="showAll(${data?.data[0]?.category_id}, 0)" class="category-btn hover:bg-red-100 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[0]?.category}</button>
    <button id="1" onclick="showAll(${data?.data[1]?.category_id}, 1)" class="category-btn hover:bg-red-100 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[1]?.category}</button>
    <button id="2" onclick="showAll(${data?.data[2]?.category_id}, 2)" class="category-btn hover:bg-red-100 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[2]?.category}</button>
    <button id="3" onclick="showAll(${data?.data[3]?.category_id}, 3)" class="category-btn hover:bg-red-100 px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[3]?.category}</button>`;

  // Add event listeners to each button
  for (let i = 0; i < 4; i++) {
    const button = document.getElementById(i);
    button.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        // Remove inline styles for all buttons
        btn.style.backgroundColor = '';
        btn.style.color = '';
      });
      // Add 'active' class and inline styles to the clicked button
      button.classList.add('active');
      button.style.backgroundColor = 'red'; // Change background color to represent active state
      button.style.color = 'white'; // Change text color to represent active state
    });
  }
}

loadData();



// all btn show data

const showAll = async (category_id = '1000') => {
  let cardData = [];

  let isEmpty = false;
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
  const data = await response.json();
  // sortByviews(data);
  // console.log(data.data);


  const cardDiv = document.getElementById('cardContainer')
  // to prevent multiple clicks
  cardDiv.textContent = '';
  errorDiv.textContent = '';



  if (data.status) {
    cardData = data.data;


    cardData?.forEach(card => {
      // console.log(card);

      const singleDiv = document.createElement('div')

      singleDiv.innerHTML = ` <div>

            <div class="">
                    <img class="rounded-md h-60 w-96" src="${card.thumbnail}" alt="">
                        <div class="text-white font-bold text-end relative bottom-10 pe-10 rounded-sm">${card.others?.posted_date ? ((card.others?.posted_date/60)/60).toFixed(2)+ ' hr' : ""}</div>
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

      // console.log(card)


    });

  }

  else {
    const errorDiv = document.getElementById('errorDiv')


    errorDiv.innerHTML = ` <div  class="flex justify-center align-center">
        <img class="" src="resources/Icon.png" alt="">
        
      </div>
      <h3 class="text-center text-4xl font-bold">Opps ,There is no data available</h3>  `



  }
  


}
showAll();

// const sortByviews = (data) =>{

// // console.log(data.data);
// const sortData =data.data.map(view =>view.others?.views)

// console.log(sortData);
// // using spread operator before sorting
// const sortedValues =[...sortData];

// sortedValues.sort();
// console.log(sortedValues);
// // sortedValues.reverse();
// // console.log(sortedValues);



// }
// sortByView on click 
const sortByViews = () => {
  console.log('hello');
  const errorDiv = document.getElementById('errorDiv');
  errorDiv.innerHTML='';
  const sortDiv = document.getElementById('cardContainer');
  sortDiv.textContent = '';

  const fetchData = async () => {
    const response = await fetch('https:/openapi.programming-hero.com/api/videos/category/1000');
    const data = await response.json();

    const videos = data.data;

    console.log(videos);

    // Function to convert views string to number
    const convertViewsToNumber = (view) => {
      // Extract the last character (unit part) and the remaining string (numeric part)
      const numericPart = view.slice(0, -1);
      const unitPart = view.slice(-1);

      let multiplier = 1;
      if (unitPart === 'K') {
        multiplier = 1000;
      }

      // Convert the numeric part to a number and multiply it by the multiplier
      return parseFloat(numericPart) * multiplier;
    };

    // Sort the videos by views
    videos.sort((a, b) => convertViewsToNumber(b.others.views) - convertViewsToNumber(a.others.views));

    videos.forEach(video => {
      const sortSingleDiv = document.createElement('div');

      sortSingleDiv.innerHTML = ` <div>

      <div class="">
              <img class="rounded-md h-60 w-96" src="${video.thumbnail}" alt="">
                  <div class="text-white font-bold text-end relative bottom-10 pe-10 rounded-sm">${video.others?.posted_date ? ((video.others?.posted_date/60)/60).toFixed(2)+ ' hr' : ""}</div>
          </div>
       <div class="space-y-2 flex gap-3 pt-4">
       <img class="rounded-full w-14 h-14 mt-5 " src="${video.authors[0].profile_picture}" alt="">
      <div class="flex-1">
        <h1 class="text-2xl font-semibold">${video.title}</h1>
       <div id="blueVerified" class="flex gap-4">
      <p>${video.authors[0].profile_name}</p>
      <div> ${video.authors[0]?.verified ? "<i class='fa-solid fa-certificate'></i>" : ""}</div>
     </div>  
     <p>${video.others.views}</p>
     
      </div>
      </div>
      </div>`


      sortDiv.appendChild(sortSingleDiv);
    });
  };
  fetchData();
};