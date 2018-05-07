function Users() {
    // () -> None
    // Container containing all username Strings
    this.container = [];
}

Users.prototype.addUser = function (name) {
    // (String) -> None
    // Append to the container
    this.container.push(name);
}

Users.prototype.removeUser = function (name) {
    // (String) -> None
    // Get the index of the item requested
    var nameIndex = this.container.indexOf(name);
    // Splice with it
    this.container.splice(nameIndex, 1);
}

Users.prototype.allUsers = function () {
    // () -> [String]
    // Return the entire container
    return this.container;
}

// Export the users function
module.exports = Users;
