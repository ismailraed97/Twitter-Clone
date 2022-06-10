// html elements
const usernameInput = document.querySelector("#username");
const tweetInput = document.querySelector("#tweet");
const tweetBtn = document.querySelector("#tweet-btn");
const feedsContainer = document.querySelector("#feeds");
const warningPara = document.querySelector(".warning");

const tweetsArr = JSON.parse(localStorage.getItem("tweets")) || [];

// create element functions
function createElement(text, ele, className, parent, secondClass) {
  const element = document.createElement(ele);
  element.classList.add(className);
  if (secondClass) {
    element.classList.add(secondClass);
  }

  element.textContent = text;
  parent.appendChild(element);
  if (ele === "img") {
    element.src = text;
  }
  return element;
}

// create tweet
function createTweet(tweet) {
  const tweetContainer = createElement("", "div", "feed-tw", feedsContainer);
  createElement("profile.jpeg", "img", "tweet-img", tweetContainer);
  const textContainer = createElement(
    "",
    "div",
    "feed-tw-details",
    tweetContainer
  );
  createElement(tweet.username, "p", "tweeter-name", textContainer);
  createElement(tweet.text, "p", "tweet-text", textContainer);
  const iconsContainer = createElement("", "div", "tweet-icons", textContainer);
  const likeIcon = createElement(
    "",
    "i",
    "fa-solid",
    iconsContainer,
    "fa-heart"
  );
  likeIcon.style.color = tweet.liked ? "rgb(255, 37, 37)" : "rgb(93, 92, 88)";
  likeIcon.onclick = () => {
    tweet.liked = !tweet.liked;
    likeIcon.style.color = tweet.liked ? "rgb(255, 37, 37)" : "rgb(93, 92, 88)";
    localStorage.setItem("tweets", JSON.stringify(tweetsArr));
  };
  const retweetIcon = createElement(
    "",
    "i",
    "fa-solid",
    iconsContainer,
    "fa-retweet"
  );
  retweetIcon.style.color = tweet.retweeted
    ? "rgb(0, 195, 0)"
    : "rgb(93, 92, 88)";
  retweetIcon.onclick = () => {
    if (tweet.retweeted === true) {
      return;
    }
    tweet.retweeted = !tweet.retweeted;
    retweetIcon.style.color = tweet.retweeted
      ? "rgb(0, 195, 0)"
      : "rgb(93, 92, 88)";
    tweetsArr.unshift(tweet);
    localStorage.setItem("tweets", JSON.stringify(tweetsArr));
    window.location.reload();
  };
}

// render tweets
function renderTweets() {
  if (tweetsArr?.length) {
    feedsContainer.textContent = "";
    for (let i in tweetsArr) {
      createTweet(tweetsArr[i]);
    }
  }
}

// add tweet
function onSubmit() {
  if (!tweetInput.value || !usernameInput.value) {
    warningPara.textContent = "* please fill all fields";
    return;
  }
  const tweetObj = {
    id: tweetsArr[0]?.id ? tweetsArr[0].id + 1 : 1,
    username: usernameInput.value,
    text: tweetInput.value,
    liked: false,
    retweeted: false,
  };
  tweetsArr.unshift(tweetObj);
  tweetInput.value = "";
  usernameInput.value = "";
  localStorage.setItem("tweets", JSON.stringify(tweetsArr));
  renderTweets();
}

// invoke functions
tweetBtn.addEventListener("click", onSubmit);
renderTweets();
