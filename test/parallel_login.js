'use strict'

const proxyquire = require('proxyquire')
const tempConfig = {
	maxFailedCount: 5,
	blockTime: 1000
}
const ParallelLogin = proxyquire('../app/modules/parallel_login', {'../../config/config': tempConfig})
const chai = require('chai')
const should = chai.should()
const assert = chai.assert

describe('Parallel Login', function() {
	before(function() {

	})

	it('Testing attempt login', function(done) {
		const ip = '1.1.1.1'
		ParallelLogin.attemptLogin('').should.equal(true)
		ParallelLogin.attemptLogin(undefined).should.equal(true)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptLogin(ip).should.equal(false)
		ParallelLogin.loginSuccessful(ip)
		done()
	})

	it('Testing attempt login after login failed', function(done) {
		const ip = '1.1.1.1'
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.loginSuccessful(ip)
		done()
	})

	it('Testing attempt login after 5 times fail', function(done) {
		const ip = '1.1.1.1'
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(false)
		done()
	})

	it('Testing login successful', function(done) {
		const ip = '1.1.1.2'
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.loginSuccessful(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(true)
		done()
	})

	it('Testing login after block time', function(done) {
		const ip = '1.1.1.3'
		ParallelLogin.attemptLogin(ip).should.equal(true)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptFailedLogin(ip)
		ParallelLogin.attemptLogin(ip).should.equal(false)
		setTimeout(() => {
			ParallelLogin.attemptLogin(ip).should.equal(true)
			done()
		}, tempConfig.blockTime+100)
	})
})