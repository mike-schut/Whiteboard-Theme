var _ = require('lodash');


var people = [{
  "id": "Male",
  'first_name': "Randy",
  "last_name": "Phillips",
  "email": "testing@abc.net",
  "ip_address": "12.23.15.31"
},{
  "id": "Female",
  'first_name': "Liz",
  "last_name": "Johnson",
  "email": "testing2@abc.net",
  "ip_address": "16.23.15.31"
},{
  "id": "Male",
  'first_name': "Johnny",
  "last_name": "Bowen",
  "email": "testing@abc.net",
  "ip_address": "23.23.15.31"
}];

var femaleCount = _.filter(people, {gender: "Female"}).length;

console.log(femaleCount + ' females');
