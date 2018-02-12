'use strict';

const MongoClient = require('mongodb');
function usage() {
    console.log('Usage');
    console.log('node', __filename, '<option>');
    console.log('Where option is one of:');
    console.log('  callbacks   Use the callbacks paradigm');
    console.log('  promises   Use the Promises paradigm');
    console.log('  generator   Use the Generator paradigm');
    console.log('  async   Use the Async module');
}

if( process.argv.length < 3){
    console.log('Incorrect number of agruments');
    usage();
}else{
    if( proces.argv[2] === 'callbacks'){
        testWithCallbacks();
    }else if( proces.argv[2] === 'promises'){
        testWithPromises();
    }else if( proces.argv[2] === 'async'){
        testWithAsync();
    }else if( proces.argv[2] === 'generator'){
        testWithGenerator();
    }else{
        console.log("Invalid option:", process.arch[2]);
        usage();
    }
}

// CALLBACKS
function testWithCallbacks() {
    MongoClient.connect('mongodb://localhost/playground', (err, db) => {
        db.collection('employees').insertOne({id: 1, name:'A. Callback'}, (err, result) => {
            console.log("Result of insert:", result.insertedId);
            db.collection('employees').find({id:1}).toArray((err, docs) => {
                console.log('Result of find:', docs);
                db.close();
            });
        });
    });
}


// PROMISES
function testWithPromises(){
    let db;
    MongoClient.connect('mongodb://localhost/playground').then( connection => {
        db = connection;
        return db.collection('employess').insertOne({id:1, name: 'B. Promises' });
    }).then( result => {
        console.log("Result of insert:", result.insertedId);
        return db.collection('employess').find({id:1}).toArray
    }).then(docs => {
        console.log('Result of finds:', docs);
        db.close();
    }).catch(err =>{
        console.log("ERROR: ", err );
    })
}

// GENERATORS
function testWithGenerator(){
    const co = require('co');
    co(function*(){
        const db = yield MongoClient.connect('mongodb://localhost/playground');
        const result = yield db.collection('employees').insertOne({id: 1, name:'C. Generators'});
        console.log('Result of insert:', result.insertedId);
        const docs = yield db.collection('employees').find({id:1}).toArray();
        console.log('Result of docs: ', docs);
        db.close();
    }).catch(err => {
        console.log("ERROR: ", err);
    })
}

// ASYNC
function testWithAsync(){
    const async = require('async');
    let db;
    async.waterfall(
        [
            next => {
                MongoClient.connect('mongodb://localhost/playground', next)
            },
            (connection, next) => {
                db = connection;
                db.collection('employees').insertOne({id: 1, name: 'D. Async'}, next );
            },
            (insertResult, next => {
                console.log('Inser result:', insertResult.insertedId)
                db.collection('employees').find({id:1}).toArray(next)
            }),
            (docs, next) => {
                console.log("Result of find docs", docs);
                db.close();
                next(null, 'All done');
            }
        ],(err, result) => {
            err ? console.log('ERROR', err) :  console.log(result);
        }
    );
}