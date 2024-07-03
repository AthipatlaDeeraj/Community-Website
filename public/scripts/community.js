 let profilesSearch = document.querySelectorAll(".profiles-button");
let displaying = document.querySelectorAll(".examplary-blogs .grid-items");
let communitySearch = document.querySelector("#communitySearchPc");
            
communitySearch.addEventListener("input", (e) => {
    console.log("inputting...");
    let inputValue = e.target.value.toLowerCase();
    profilesSearch.forEach((button, index) => {
        let communityName = button.textContent.toLowerCase();
        if (!communityName.includes(inputValue)) {
            displaying[index].classList.add("hidden")
        } else {
            displaying[index].classList.remove("hidden");
        }
    });
});  



let addCommunitiesButton=document.querySelector(".add-communities-button");
let div=document.querySelector(".adding-community-div");

document.addEventListener("DOMContentLoaded",()=>{
    div.style.display="none";
    let toggling=true;
    addCommunitiesButton.addEventListener("click",(e)=>{
        e.preventDefault();

        if(toggling){
            div.style.display="none";
        }
        else{
            div.style.display="block";
        }
        toggling=!toggling;
    });
})


let form=document.querySelector("#submit");
let examplaryBlogs=document.querySelector(".examplary-blogs");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let imageInput=document.querySelector("#addimage");
    let newCommunity=document.querySelector("#newcommunityname");
    let CommunityName=newCommunity.value;

    if (imageInput.files && imageInput.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let newCommunityHTML = `
                <div class="grid-items">
                    <img src="${e.target.result}" alt="trending posts">
                    <button class="profiles-button"><a href="#">${CommunityName}</a></button>
                    <p class="description">Join our social media community to get latest updates</p>
                </div>`;
            examplaryBlogs.innerHTML += newCommunityHTML;
            
            profilesSearch = document.querySelectorAll(".profiles-button");
            displaying = document.querySelectorAll(".examplary-blogs .grid-items");
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
})
