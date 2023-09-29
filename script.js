const accessKey = "pXIJl7NqbEtyR5ytSQI_HS8xEIv8GfRi9x592d_DCbY"
const searchForm = document.getElementById('search-form')
const searchBox= document.getElementById('search-box')
const searchResult= document.getElementById('search-result')
const showMoreBtn = document.getElementById('show-more-btn');
let keyword = ""
let page = 1;
const likeButton = document.querySelector('.like-button');
async function searchImage(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response =  await fetch(url);
    const data = await response.json();

    const results = data.results;
    console.log(data.results.likes)
    if(page === 1){
        searchResult.innerHTML = "";
    }

    results.map((result)=>{
        //pahle ek div bana lo 
        const insideSearchDiv = document.createElement('div')
        

        console.log(result.cover_photo.likes)
        const imagen = document.createElement("img")
         imagen.src = result.cover_photo.urls.small;
                   //link so that user when click on image the image redirect on unsplash website

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html;

        //we have to add target = _blank so that link will open in new tab

        imageLink.target = "_blank";

        imageLink.appendChild(imagen);//image will be inside the  a tag 
         insideSearchDiv.appendChild(imageLink);
        //a tag should be displayed in out div called search-result
       insideSearchDiv.appendChild(imageLink);//image will be displayed in search result

        //ek like button create kar lo 
        const likeButton = document.createElement('span');
        likeButton.innerHTML  = `Total Likes : ${result.cover_photo.likes}`;
        likeButton.setAttribute('id','like-button');
         insideSearchDiv.appendChild(likeButton)
         searchResult.appendChild(insideSearchDiv);
              
    })
    showMoreBtn.style.display = 'block';
}

searchForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    page = 1;
    searchImage();
});
showMoreBtn.addEventListener('click',()=>{
    page++;
    searchImage();
})