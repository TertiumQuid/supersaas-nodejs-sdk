var assert = require('assert');
var SuperSaaS = require('../src/index');
var Client = SuperSaaS.SDK.Client;

describe('Client', function() {
  it("initializes apis", function() {
    var client = new Client({test: true})
    assert.equal(typeof client.appointments, 'object')
    assert.equal(typeof client.forms, 'object')
    assert.equal(typeof client.users, 'object')
  })

  it("performs request", function() {
    var client = new Client({test: true, accountName: 'acc', password: 'pwd'})
    var methods = ['GET','POST','PUT','DELETE']
    for (var i = 0; i < methods.length; i++) {
      var res = client.request(methods[i], '/test', {test: true});
      console.log(res)
    }
  })

  it("configures instance", function() {
    Client.configure({
      accountName: 'account',
      password: 'password',
      userName: 'user',
      host: 'http://test',
      test: true
    })
    assert.equal(Client.Instance.accountName, 'account')
    assert.equal(Client.Instance.password, 'password')
    assert.equal(Client.Instance.userName, 'user')
    assert.equal(Client.Instance.host, 'http://test')
  })
});