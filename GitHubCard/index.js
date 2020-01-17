/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

var followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function cardMaker(obj){
  //Creating HTML Elements
  const card = document.createElement('div')
  const cardImg = document.createElement('img')
  const cardInfo = document.createElement('div')
  const name = document.createElement('h3')
  const username = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const pageAdd = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')

  //Assigning parent/child elements
  card.append(cardImg)
  card.append(cardInfo)
  cardInfo.append(name)
  cardInfo.append(username)
  cardInfo.append(location)
  cardInfo.append(profile)
  profile.append(pageAdd)
  cardInfo.append(followers)
  cardInfo.append(following)
  cardInfo.append(bio)

  //Assigning Text content and Attributes
  card.classList.add('card')
  cardInfo.classList.add('card-info')
  name.classList.add('name')
  username.classList.add('username')

  //Adding content from API
  name.textContent = obj[18] == null ? `${obj[0]}` : obj[18]
  username.textContent = obj[0];
  bio.textContent = bio.textContent = obj[24] == null ? "No bio set" : obj[24];
  location.textContent = obj[21] == null ? `Location: Not available` : `Location: ${obj[21]}`;
  followers.textContent = `Followers: ${obj[27]}`;
  following.textContent = `Following: ${obj[28]}`;
  cardImg.src = obj[3];
  pageAdd.textContent = `View ${obj[18]}'s GitHub profile.`;
  pageAdd.href = obj[6];

  return card;
}

const profileSection = document.querySelector('.cards')

axios.get('https://api.github.com/users/alexvision26').then(res =>{
  const profile = Object.values(res.data) //Deconstruct object from API into an array
  profileSection.append(cardMaker(profile))
})
//This API request pulls followers from my profile
axios.get('https://api.github.com/users/alexvision26/followers').then(res =>{
  res.data.forEach(user => {
    axios.get('https://api.github.com/users/'+user.login).then(res =>{ //Grabs GitHub handles and then routes to each followers API
      const profile = Object.values(res.data) //Deconstruct object from API into an array
      profileSection.append(cardMaker(profile))
    })
  })
})



/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
