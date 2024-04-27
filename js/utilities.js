const btn_blogs = document.getElementById('btn_blogs')
btn_blogs.addEventListener('click', function btn_blogs() {

    // console.log('hellloo')
    window.location.href = "http://127.0.0.1:5500/blogs.html"

})

const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();
    // console.log(data.data[0].category);

    const dynamicBtn = document.getElementById('dynamicBtn');
    dynamicBtn.innerHTML = `
        <button onclick="showAll(${data?.data[0]?.category_id})" class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold                    text-white">${data?.data[0]?.category}</button>
        <button  class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[1]?.category}</button>
        <button class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[2]?.category}</button>
        <button class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[3]?.category}</button>`;


}

loadData();

// all btn show data

const showAll = async(category_id) =>{

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    const data = await response.json();
    // console.log(data.data);
    const cardData =data.data;
    const cardDiv =document.getElementById('cardContainer')
    
    cardData.forEach(card => {
        console.log(card);
        const singleDiv = document.createElement('div')
        singleDiv.innerHTML=` <div>
               
        <img class="rounded-md h-60 w-96" src="${card.thumbnail}" alt="">
    
         <div class="space-y-2 flex gap-3 pt-4">
         <img class="rounded-full w-14 h-14 mt-5 " src="${card.authors[0].profile_picture}" alt="">
        <div class="flex-1">
          <h1 class="text-2xl font-semibold">${card.title}</h1>
         <div class="flex gap-4">
        <p>${card.authors[0].profile_name}</p>
        <p><i class="fa-solid fa-certificate"></i></p>
       </div>  
       <p>${card.others?.views}</p>
        </div>
        </div>
        </div>`
cardDiv.appendChild(singleDiv);
        
    });

}






