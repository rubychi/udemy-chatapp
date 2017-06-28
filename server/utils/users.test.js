const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'test1',
    }, {
      id: '2',
      name: 'Jen',
      room: 'test2',
    }, {
      id: '3',
      name: 'Julie',
      room: 'test1',
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    const user = {
      id: '123',
      name: 'Ruby',
      room: 'The Office Fans',
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    expect(users.removeUser('1')).toEqual({
      id: '1',
      name: 'Mike',
      room: 'test1',
    });
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    expect(users.removeUser('0')).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    expect(users.getUser('1')).toEqual({
      id: '1',
      name: 'Mike',
      room: 'test1',
    });
  });

  it('should not find user', () => {
    expect(users.getUser(0)).toNotExist();
  });

  it('should return names for room test1', () => {
    const userList = users.getUserList('test1');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for room test2', () => {
    const userList = users.getUserList('test2');
    expect(userList).toEqual(['Jen']);
  });
});
