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
        <button class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold                    text-white">${data?.data[0]?.category}</button>
        <button class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[1]?.category}</button>
        <button class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[2]?.category}</button>
        <button class="px-4 py-3 bg-slate-400 rounded-md mt-4 text-center text-2xl font-semibold text-white">${data?.data[3]?.category}</button>`;

}

loadData();






