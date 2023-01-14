// html elements
const tweetInput = document.querySelector("#tweet-input");
const tweetBtn = document.querySelector("#tweet-btn");
const feedsContainer = document.querySelector("#feeds");
const warningPara = document.querySelector(".warning");

const tweetsArr = JSON.parse(localStorage.getItem("tweets")) || [
  {
    id: 1,
    username: "Ismail Raed",
    text: "Hope is the heart of life ❤️",
    liked: false,
    retweeted: false,
    time: "23h",
  },
];

// create element functions
function createElement(text, ele, className, parent, secondClass) {
  const element = document.createElement(ele);
  if (className) {
    element.classList.add(className);
  }
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

function createIcon(name, text, parent) {
  const container = createElement("", "div", "icon-container", parent);
  const icon = createElement("", "iconify-icon", "", container);
  icon.icon = name;
  createElement(text, "p", "icon-text", container);
  return icon;
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
  const namesContainer = createElement(
    "",
    "div",
    "names-container",
    textContainer
  );
  createElement(tweet.username, "p", "tweeter-name", namesContainer);
  createElement("@ismailraed97", "p", "username", namesContainer);
  createElement(tweet.time, "p", "username", namesContainer);

  createElement(tweet.text, "p", "tweet-text", textContainer);
  const iconsContainer = createElement("", "div", "tweet-icons", textContainer);
  const likeIcon = createIcon(
    "mdi:cards-heart",
    Math.floor(Math.random() * 50).toString(),
    iconsContainer
  );
  likeIcon.style.color = tweet.liked ? "rgb(255, 37, 37)" : "rgb(93, 92, 88)";
  likeIcon.onclick = () => {
    tweet.liked = !tweet.liked;
    likeIcon.style.color = tweet.liked ? "rgb(255, 37, 37)" : "rgb(93, 92, 88)";
    localStorage.setItem("tweets", JSON.stringify(tweetsArr));
  };
  createIcon(
    "mdi:message-reply-outline",
    Math.floor(Math.random() * 50).toString(),
    iconsContainer
  );
  const retweetIcon = createIcon(
    "mdi:twitter-retweet",
    Math.floor(Math.random() * 50).toString(),
    iconsContainer
  );
  retweetIcon.icon = "mdi:twitter-retweet";
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
  if (!tweetInput.value) {
    warningPara.textContent = "* please add a tweet";
    return;
  } else {
    warningPara.textContent = "";
  }
  const tweetObj = {
    id: tweetsArr[0]?.id ? tweetsArr[0].id + 1 : 1,
    username: "Ismail Raed",
    text: tweetInput.value,
    liked: false,
    retweeted: false,
    time: "1m",
  };
  tweetsArr.unshift(tweetObj);
  tweetInput.value = "";
  localStorage.setItem("tweets", JSON.stringify(tweetsArr));
  renderTweets();
}

// invoke functions
tweetBtn.addEventListener("click", onSubmit);
renderTweets();
