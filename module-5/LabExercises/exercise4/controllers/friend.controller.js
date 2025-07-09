const friends = require('../models/friends');

// 1. Fetch all friends /friends
exports.getAllFriends = (req, res) => {
  try {
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Filter endpoint, gets friends matching the gender from 'gender' query parameter ie. /friends/filter?gender=male
// Task #1: Add support to also filter by a starting 'letter' query parameter ie. /friends/filter?letter=R

exports.filterFriend = async (req, res) => {
  console.log(req.query);
  let filterGender = req.query.gender;
  let filterLetter = req.query.letter;
  let matchingFriends = [...friends];

  if (filterGender) {
    matchingFriends = matchingFriends.filter(
      (friend) => friend.gender == filterGender
    );
  }

  if (filterLetter) {
    matchingFriends = matchingFriends.filter((friend) =>
      friend.name.toLowerCase().startsWith(filterLetter.toLowerCase())
    );
  }

  let errorMessage = 'No friends found';

  if (filterGender && filterLetter) {
    errorMessage = `No friends matching gender "${filterGender}" and starting letter "${filterLetter}"`;
  } else if (filterGender) {
    errorMessage = `No friends matching gender "${filterGender}"`;
  } else if (filterLetter) {
    errorMessage = `No friends starting with the letter "${filterLetter}"`;
  }

  if (matchingFriends.length > 0) {
    // return valid data when the gender matches
    res.status(200).json(matchingFriends);
  } else {
    // and an error response when there are no matches
    res.status(404).json({ error: errorMessage });
  }
};

// 3. Header Info
// Task #2: Modify the 'info' route to only return the user-agent, content-type and accept header data

exports.getHeaderInfo = async (req, res) => {
  console.log(req.headers);
  res.json({
    'user-agent': req.headers['user-agent'],
    accept: req.headers.accept,
  });
};

// 4. Get Friend by ID
// Task #3: Modify the dynamic GET route to return a single friend object matching the dynamic 'id' request parameter

exports.getFriendById = async (req, res) => {
  console.log(req.params);
  let friendId = req.params.id;
  try {
    let matchedFriend = friends.find((friend) => friend.id == friendId);

    if (matchedFriend) {
      res.status(200).json(matchedFriend);
    } else {
      res.status(404).json({ result: `Friend #${friendId} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Create new friend
// Test body { "name": "Valerie", "gender": "female" }

exports.createNewFriend = async (req, res) => {
  try {
    let newFriend = req.body;
    console.log(newFriend);

    // Validation
    if (!newFriend.name || !newFriend.gender) {
      throw new Error('Friend object must contain a name and gender');
    }

    // Assign an ID if missing
    if (!newFriend.id) {
      newFriend.id = friends.length + 1;
    }

    // Add to list
    friends.push(newFriend);
    res.status(200).json(newFriend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6. Edit friend data
// Task #4: Complete the PUT route which will update data for an existing friend
// Test: { "name": "Val" } @ http://localhost:3000/friends/:id

exports.editFriendData = async (req, res) => {
  try {
    let friendId = req.params.id;
    let updatedFriend = req.body;
    let friendIndex = friends.findIndex((friend) => friend.id == friendId);

    if (friendIndex !== -1) {
      friends[friendIndex] = { ...friends[friendIndex], ...updatedFriend };

      res.status(200).json({
        result: `Updated friend with ID ${friendId}`,
        data: friends[friendIndex],
      });
    } else {
      res.status(404).json({ result: `Friend not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
