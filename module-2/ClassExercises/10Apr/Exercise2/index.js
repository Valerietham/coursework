let followers = 0;
let followButton = document.getElementById('follow-button');

function addFollower() {
  followers += 1;
  document.getElementById('followers-count-el').textContent =
    'followers: ' + followers;
}

console.log(followers);
