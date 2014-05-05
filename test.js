
var expect = require('expect.js')
var recordParser = require('csv-record-parser');
var lensParser = require('./');

describe('dot-lens record parser', function(){
  it('works for nested properties', function(){
    var csv = recordParser();
    csv.header(['name.first', 'name.last'])
    csv.row(['bill', 'casarin'])
    var parser = lensParser()
    expect(parser(csv)).to.eql({ name: { first: 'bill', last: 'casarin' } });
  });

  it('works for nested properties with arrays', function(){
    var csv = recordParser();
    csv.header(['name.first.1.name', 'name.last'])
    csv.row(['bill', 'casarin'])
    var parser = lensParser()
    expect(parser(csv)).to.eql({
      name: {
        first: [,{name:'bill'}],
        last: 'casarin'
      }
    });
  });
});
