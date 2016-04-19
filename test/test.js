var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;

var server = request.agent("http://localhost:80");

describe('loading express', function() {
    it('responds to /', function testSlash(done) {
        server.get('/').expect(200, done);
    });
    it('responds to /test', function testTest(done) {
    	server.get('/test').expect(200, {test:true}).end(done);
    });
    it('404 everything else', function testPath(done) {
        server.get('/foo/bar').expect(404, done);
    });
});

describe('sending GET requests', function() {
	it('responds to /tags', function testTags(done){
		server.get('/tags').expect(function (res){
			expect(res).to.be.a('Object');
		}).end(done);
	});
	it('responds to /materials', function testMaterials(done){
		server.get('/materials').expect(function (res){
			expect(res).to.be.a('Object');
		}).end(done);
	});
	it('responds to search queries', function testIndex(done){
		server
		  .get('/index')
		  .send({'search':''})
		  .expect(function(res){
		  	expect(res).to.be.a('Object');
		  }).end(done);
	})
})

describe('sending POST requests', function() {
	it('responds to /solutionid', function testSolutionID(done){
		server
		  .post('/solutionid')
		  .send({solutionid: 1})
		  .expect(function (res){
			expect(res).to.be.a('Object');
		}).end(done);
	});
	it('responds to /matid', function testMatID(done){
		server
		  .post('/matid')
		  .send({matid: 1})
		  .expect(function (res){
			expect(res).to.be.a('Object');
		}).end(done);
	});
})