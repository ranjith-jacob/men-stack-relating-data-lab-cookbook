const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // recipes: { //! "You will be referencing the Recipe schema within the User schema, establishing a one-to-many relationship"
  //   type: String,
  //   ref: "Recipe"
  // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
