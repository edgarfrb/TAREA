// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAVb8ipWoDnHzE072NKZvfQuXQTrtKmTZI",
    authDomain: "salon-edgar.firebaseapp.com",
    databaseURL: "https://salon-edgar.firebaseio.com",
    projectId: "salon-edgar",
    storageBucket: "salon-edgar.appspot.com",
    messagingSenderId: "794804168822",
    appId: "1:794804168822:web:eaf96323a255a59bfb9757"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Reference message collection
var tweetRef = firebase.database().ref('newPosts');

//Listen for form submit
document.getElementById('tweetForm').addEventListener('submit', submitTweet);


//Sumit form
function submitTweet(e) {
    e.preventDefault();

    //Get values
    var name = getInputVal('name');
    var username = getInputVal('username');
    var tweet = getInputVal('tweet');

    //Save tweet
    saveTweet(name, username, tweet);

    //Show alert
    document.querySelector('#alert').style.display = 'block';

    //Hide alert after sending tweet
    setTimeout(function() {
        document.querySelector('#alert').style.display = 'none';
    }, 2000);

    //Clear form
    document.getElementById('tweetForm').reset();
}


//Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}


//Save tweet to firebase
function saveTweet(name, username, tweet) {
    var newTweetRef = tweetRef.push();
    newTweetRef.set({
        name: name,
        username: username,
        tweet: tweet
    });
}

// Delete tweet

function delete_tweet(id) {
    firebase.database().ref(tweetRef).remove()
    postData()
}


//Post data
function postData() {
    firebase.database().ref("newPosts").once("value", function(base_datos) {
        base_datos.forEach(function(productos) {
            var tweetData = productos.val()
            var results = document.getElementById('tweetList');
            if (results) {
                results.innerHTML = "";
                for (var data in tweetData) {
                    tmp = data.toString()
                    results.innerHTML +=
                        `<li>
                    <div id="tweetData">
                    <h2 class="className">${tweetData[data].name}</h2>
                    <h3 class= "classUsername">${tweetData[data].username}</h3>
                    <p class="tweetBody" id="${tmp}_nombre"> ${tweetData[data].tweet} </p>
                    <span class="tweetOptions material-icons" onclick="delete_tweet('${tmp}')">delete</span>
                    </div><br>
                     </li>`;
                }
            }
        })
    })
}

postData()