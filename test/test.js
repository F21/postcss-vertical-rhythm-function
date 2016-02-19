'use strict';

var postcss = require('postcss'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    plugin = require('../');

var test = function (fixture, opts, done) {
    var input = fixture + '.css',
        expected = fixture + '.expected.css';

    input = fs.readFileSync(path.join(__dirname, 'fixtures', input), 'utf8');
    expected = fs.readFileSync(path.join(__dirname, 'fixtures', expected), 'utf8');

    postcss([ plugin(opts) ])
        .process(input)
        .then(function (result) {
            expect(result.css).to.eql(expected);
            expect(result.warnings()).to.be.empty;
            done();
        }).catch(function (error) {
        done(error);
    });

};

describe('postcss-vertical-rhythm-function', function() {

    it('applies vertical rhythm with defaults', function(done) {
        test('default', {}, done);
    });

    it('applies vertical rhythm from font property', function(done) {
        test('font-property', {}, done);
    });

    it('works with multiple uses in one property', function(done) {
        test('multiple-use', {}, done);
    });

    it('handles multiple selectors', function(done) {
        test('multiple-selectors', {}, done);
    });

    it('handles fraction line heights', function (done) {
        test('fractional-line-height', {}, done);
    });

    it('handles fraction vertical rhythms', function (done) {
        test('fractional-vertical-rhythm', {}, done);
    });
});