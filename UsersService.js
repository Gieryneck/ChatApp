class UsersService {

    constructor() {
        
        this.users = [];
    }
  
    getAllUsers() {
        return this.users;
    }
  
    getUserById(userId) { // socket.id is given as parameter

         return this.users.find(user => user.id === userId);
    }
  
    addUser(user) {
         this.users = [user, ...this.users];
    }
  
    removeUser(userId) {
        this.users = this.users.filter(user => user.id !== userId); // return only those ids that differ from the one given in parameter
    }
  }

module.exports = UsersService;