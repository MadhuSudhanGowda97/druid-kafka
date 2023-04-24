var chai = require('chai')
var spies = require('chai-spies')
const { describe } = require('mocha')
chai.use(spies)
var should= chai.should()
var request = require()
import { app } from '../api'
import {request} from '../api'
describe('create',()=>{
    chai.spy.on(request,"post",()=>{
        return 
    })
})

