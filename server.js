const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const axios = require('axios');
const cors = require('cors');
const { ObjectId } = require('mongodb');
require('dotenv').config();

let bookFloorList, computerProgramList, daisyList, digitalBookList, hanofficeList, internetList, ocrList, screenReaderList, smartPhoneList;
let base, engBraille, hangeul, symbol, touch;
let connetToZeroHoneyMongoDb = 'mongodb+srv://zerohoney:e911291!e9@cluster0.wlnrf.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(connetToZeroHoneyMongoDb, function (err, client) {

    //  "proxy": "http://localhost:8080"

    // node.js
    // 전역변수
    var dbAccount = client.db('Account');
    var dbStudent = client.db('Student');
    var dbEccList = client.db('EccList');
    var dbEccEvaluationData = client.db('EccEvaluationData');
    // 각 폼을 불러와주는 쿼리값
    // 리스트를 임시보관할 array
    var tempList;



    // 컬렉션 이름 바꾸는 메소드
    // MongoClient.connect('mongodb+srv://ecoco97:e911291!e9@eccproject.7wg6l.mongodb.net/EccSubtech?retryWrites=true&w=majority',function (err,client){
    //     db=client.db('EccSubtech');
    //     db.collection('form_daisy').rename('form/0/2');

    //     })

    // express 미들웨어 관리



    // .urlencoded()은 x-www-form-urlencoded형태의 데이터를
    // .json()은 JSON형태의 데이터를 해석

    // json 파일을 qs모듈로 사용
    app.use(express.urlencoded({ extended: true }));
    // json 파일을 qs모듈로 사용

    // json 파일 해석
    app.use(express.json());
    // json 파일 해석

    // express 미들웨어 관리

    http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
    })
    app.listen(8080, (req, res) => {

        console.log('성공했구나 이녀석..')
    })


    // var server=http.createServer(app).listen(8080,function(req,res){

    //     console.log('또 성공했구나..이녀석');
    // })


    // https.createServer(options,app).listen(443,function(){
    //     console.log('또 또 성공했구나..이녀석');
    // })

    // 1.백엔드 2.프론트엔드 3.미들웨어




    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'))
    })
    app.get('/', function (요청, 응답) {
        응답.sendFile(__dirname + '/index.html')
    });

    app.get('/pet', function (요청, 응답) {
        응답.send('펫용품 사시오')
    })

    app.get('/test', (req, res) => {
        MongoClient.connect('mongodb+srv://ecoco97:e911291!e9@eccproject.7wg6l.mongodb.net/test?retryWrites=true&w=majority', function (err, client) {
            db = client.db('test');
            db.collection('test_apple').find().toArray((err, result) => { res.send(result) });;

        })
    })
    // google-site-verification=uR1kEOUbJS60DOSd7pJM70Gpx8YqKfY-jjPk1oY_QUk
    // 파이어베이스 테스트용
    app.post('/testFire', (req, res) => {
        database.ref('ECC').once('보조공학').then(function (snapshot) {
        })

    })

    //  ECC list불러오는 함수
    app.get('/getEccList', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        let getEccList;
        var EccList = dbEccList.collection('List');
        const { data } = req.query;
        const dataArray = data.split('/');
        if (parseInt(dataArray[0]) === 0) {
            EccList.find({ _id: ObjectId('62cbff16c405696e9086655c') }).toArray((err, result) => {
                switch (parseInt(dataArray[1])) {
                    case 0: getEccList = result[0].보조공학.책마루;
                        break;
                    case 1: getEccList = result[0].보조공학.OCR;
                        break;
                    case 2: getEccList = result[0].보조공학.데이지플레이어
                        break;
                    case 4: getEccList = result[0].보조공학.스마트기기활용
                        break;
                    case 5: getEccList = result[0].보조공학.스크린리더
                        break;
                    case 6: getEccList = result[0].보조공학.인터넷활용
                        break;
                    case 7: getEccList = result[0].보조공학.전자교재
                        break;
                    case 8: getEccList = result[0].보조공학.컴퓨터및프로그램
                        break;
                    case 9: getEccList = result[0].보조공학.한글및오피스
                        break;



                }
                res.send(getEccList);

            })

        } else if (parseInt(dataArray[0]) === 1) {
            EccList.find({ _id: ObjectId('62cbffc9c405696e9086a00c') }).toArray((err, result) => {
                switch (parseInt(dataArray[1])) {
                    case 0: getEccList = result[0].보행.보행체크리스트;

                        break;

                }
                res.send(getEccList);

            })
        } else if (parseInt(dataArray[0]) === 3) {

            EccList.find({ _id: ObjectId('62cc000ec405696e9086b6d5') }).toArray((err, result) => {
                switch (parseInt(dataArray[1])) {
                    case 0: getEccList = result[0].일상생활기술.책마루;
                        break;
                    case 1: getEccList = result[0].일상생활기술.건강과안전;
                        break;
                    case 2: getEccList = result[0].일상생활기술.시간관리;
                        break;
                    case 3: getEccList = result[0].일상생활기술.식생활;
                        break;
                    case 4: getEccList = result[0].일상생활기술.신변처리;
                        break;
                    case 5: getEccList = result[0].일상생활기술.의생활;
                        break;
                    case 6: getEccList = result[0].일상생활기술.자기주장및보호;
                        break;
                    case 7: getEccList = result[0].일상생활기술.전화기술;
                        break;
                    case 8: getEccList = result[0].일상생활기술.청소기술;
                        break;
                    case 8: getEccList = result[0].일상생활기술.화폐활용;
                        break;



                }
                res.send(getEccList);

            })
        } else {

            EccList.find({ _id: ObjectId('62cbff66c405696e90867f5a') }).toArray((err, result) => {
                switch (parseInt(dataArray[1])) {
                    case 0: getEccList = result[0].점자.기호점자;
                        break;
                    case 2: getEccList = result[0].점자.영어점자;
                        break;
                    case 3: getEccList = result[0].점자.점자의기초;
                        break;
                    case 4: getEccList = result[0].점자.촉각훈련;
                        break;
                    case 5: getEccList = result[0].점자.한글점자;
                        break;




                }
                res.send(getEccList);

            })
        }


    })

    //  ECC list불러오는 함수


    app.get('/getOcr', (req, res) => {
        MongoClient.connect('mongodb+srv://ecoco97:e911291!e9@eccproject.7wg6l.mongodb.net/EccSubtech?retryWrites=true&w=majority', function (err, client) {

            db = client.db('EccSubtech');
            db.collection('form_ocr').find().toArray((err, result) => { if (err) console.log(err); res.send(result) });

        })

    })

    app.get("/getSubtech", (req, res) => {
        //ecc보조공학을 임시 보관하는 array
        MongoClient.connect(connetToZeroHoneyMongoDb, function (err, client) {
            db = client.db('EccSubtech');
            db.collection('list').find().toArray((err, result) => {
                if (err) throw err;

                bookFloorList = result[0].bookFloor;
                computerProgramList = result[1].computerProgram;
                daisyList = result[2].daisy;
                digitalBookList = result[3].digitalBook;
                hanofficeList = result[4].hanoffice;
                internetList = result[5].internet;
                ocrList = result[6].ocr;
                screenReaderList = result[7].screenReader;
                smartPhoneList = result[8].smartPhone;
                tempList = [bookFloorList, computerProgramList, daisyList, digitalBookList, hanofficeList, internetList, ocrList, screenReaderList, smartPhoneList];

                res.send(tempList);
            });

        })
    }

    )

    app.get('/getMoontype', (req, res) => {
        MongoClient.connect(connetToZeroHoneyMongoDb, function (err, client) {

            db = client.db(EccMoonType);
            db.collection('list').find().toArray((err, result) => {
                if (err) throw console.log(err);

                base = result[0].base;
                engBraille = result[1].engBraille;
                hangeul = result[2].hangeul;
                symbol = result[3].symbol;
                touch = result[4].touch;
                tempList = [base, engBraille, hangeul, symbol, touch];

                res.send(tempList);
            })

        })



    })
    app.get('/getStudentListFromDB', function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        dbStudent.collection('A').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        })

    })




    // 학생의 ECC평가 정보를 가져오는 함수


    // 사전평가 정보 불러오는 함수
    app.get('/getStudentPreEvaluationData', function (req, res) {
        let { studentData } = req.query;
        dbEccEvaluationData.collection('PreTest').find({ 'uid': studentData }).toArray(function (err, result) {
            if (err) throw err;

            res.send(result);
        })

    })
    // 사전평가 정보 불러오는 함수

    // 가장최신 사전평가를 불러오는 함수
    app.get('/getLastPretestData', function (req, res) {

        let { id, category } = req.query;
        dbEccEvaluationData.collection('PreTest').find({ uid: id, smallCategory: category }, { projection: { date: 1 } }).toArray((err, result) => {
            let yearArray = new Array();
            let monthArray = new Array();
            let dayArray = new Array();
            let hourArray = new Array();
            let i;
            let split;

            let lastTime = {
                year: '',
                month: '',
                day: '',
                hour: ''
            }

            if (err) throw err;


            // 콜백 지옥 해결하자.... setTimeArray로 연도/월/날/시간 순으로 쪼개고lastTime object에 최근 날짜를 집어넣음
            const setLastTime = async () => {
                setTimeArray(yearArray, monthArray, dayArray, hourArray, result, split).then(() => {
                    validateYear(yearArray).then((yearTempData) => {
                        lastTime.year = yearTempData;
                        validateMonth(monthArray).then((monthTempData) => {
                            lastTime.month = monthTempData;
                            validateDay(dayArray).then((dayTempData) => {
                                lastTime.day = dayTempData;
                                validateHour(hourArray).then((hourTempData) => {
                                    lastTime.hour = hourTempData;
                                    // object에 있는 각 날짜를 조합하여 찾음
                                    dbEccEvaluationData.collection('PreTest').find({ date:`${lastTime.year}/${lastTime.month}/${lastTime.day}/${lastTime.hour}`} ).toArray((err, result) => {
                                        console.log(result);

                                    })

                                })
                            })

                        });
                    })
                })
            }

       setLastTime();


    //    불러온 날짜를 연도/월/일/시간 으로 쪼개서 각 배열에 push함
            async function setTimeArray() {
                for (i = 0; i < result.length; i++) {
                    split = result[i].date.split('/');
                    yearArray.push(split[0]);
                    monthArray.push(split[1]);
                    dayArray.push(split[2]);
                    hourArray.push(split[3]);
                }


            }

            async function validateYear(yearArray) {

                // 가장 큰 값을 리턴하는 메소드 constructor로 개별 객체 사용=> tempData중복 활용 가능
                for (i = 0; i < yearArray.length; i++) {
                    if (i == 0) {
                        this.tempData = yearArray[0];

                    } else if (tempData < yearArray[i]) {
                        this.tempData = yearArray[i];

                    }

                }

                return this.tempData;

            }

            async function validateMonth(monthArray) {

                for (i = 0; i < monthArray.length; i++) {
                    if (i == 0) {
                        this.tempData = monthArray[0];

                    } else if (tempData < monthArray[i]) {
                        this.tempData = monthArray[i];

                    }

                }

                return this.tempData;

            }

            async function validateDay(dayArray) {

                for (i = 0; i < dayArray.length; i++) {
                    if (i == 0) {
                        this.tempData = dayArray[0];

                    } else if (tempData < dayArray[i]) {
                        this.tempData = dayArray[i];

                    }

                }

                return this.tempData;

            }
            async function validateHour(hourArray) {

                for (i = 0; i < hourArray.length; i++) {
                    if (i == 0) {
                        this.tempData = hourArray[0];

                    } else if (tempData < hourArray[i]) {
                        this.tempData = hourArray[i];

                    }

                }

                return this.tempData;

            }


        })


        // projection으로 date만 불러오고 그중 최신값 간추려냄, 그 후에 다시 find로 최근 사전평가를 불러옴
    })




    // 가장최신 사전평가를 불러오는 함수




    // 학생의 ECC평가 정보를 가져오는 함수

    app.post('/user', function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        var tempUser = '이것은 String 치즈 입니다.'
        res.send(tempUser);
    })







    // ECC REST API 통신
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build/index.html'))

    })





    // DB에서 학생정보 가져오는 메소드


    app.post('/sendData', (req, res) => {
        data = req.body.data;
    })




    app.post('/addSome', (req, res) => {

        MongoClient.connect('mongodb+srv://ecoco97:e911291!e9@eccproject.7wg6l.mongodb.net/test?retryWrites=true&w=majority', function (err, client) {
            var para1 = req.body.log1;
            var para2 = req.body.log2;

            db = client.db('test')
            db.collection('user').insertOne({ name: para1, password: para2 }, function (err, result) {
            });


            // db.collection('test_apple').ubdateOne({},{})
        })

    })
    app.post('/enroll', (req, res) => {

        const tem = req.body.data;

        Add.addStudent(tem, res);

        // db.collection('test_apple').ubdateOne({},{})
    })





    app.post('/addForm', (req, res) => {

        MongoClient.connect('mongodb+srv://ecoco97:e911291!e9@eccproject.7wg6l.mongodb.net/EccSubtech?retryWrites=true&w=majority', function (err, client) {

            db = client.db('EccSubtech')
            db.collection('list').insertOne({ name: '하이' }, function (err, result) {
            });


            // db.collection('test_apple').ubdateOne({},{})
        })

    })



    // 사전평가 저장하는 함수
    app.post('/putPreEccData', (req, res) => {
        dbEccEvaluationData.collection('PreTest').insertOne(req.body, function (err, result) {
            if (err) throw err;
        });

        // 각 카테고리의 최신 평가 시간 갱신 메소드

        // dbEccEvaluationData.collection('PreTestRecent').updateOne({uid:req.body.uid},{$set:{recentDate:req.body.date}}, function (err, result) {
        //     if (err) throw err;
        //     console.log('저장 성공')
        // });





        res.send('성공');
    })

    // 사전평가 저장하는 함수

    // 사후평가 저장하는 함수


    app.post('/putPostEccData', function (request, response) {

        dbEccEvaluationData.collection('PostTest').insertOne(request.body, function (err, result) {
            if (err) throw err;
        })

    });



    // 사후평가 저장하는 함수

    // ecc데이터 저장 메소드 시작
    app.post('/addScoreOcr', (req, res) => {
        Post.addScoreSubtechOcr(req.body.btn);
    })
    app.post('/addScoreDaisy', (req, res) => {

        Post.addScoreSubtechDaisy(req.body.btn);
        // 만약 점수 2번 버튼을 누른다면 가져온 아이디를 검사하여 사전,사후,현재 평가에 2점 부여
    })

    // 회원가입 메소드
    app.post('/doingSignUp', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");

        userInformation = req.body.user;
        // split으로 쪼개서 각각 대입
        let info = userInformation.split('___');
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return err;
            bcrypt.hash(info[3], salt, function (err, hashedPassword) {
                if (err) return err;
                info[3] = hashedPassword;
                dbAccount.collection('User').insertOne({ name: info[0], birth: info[1], email: info[2], password: info[3] }
                    , function (err, result) {
                    })
            })

        })
        res.redirect('/')

    })

    // 회원가입 실패시 새로고침 메소드

    app.post('/again', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(`<script>
    alert('회원 정보에 _가 포함되어 있습니다.');
    history.back();
</script>`);
        // redirect로 뒤로가기 하는법
        // res.redirect(req.header('Referer')|| '/');
    })
    // ecc데이터 저장 메소드 끝

    // 회원 인증 API
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const session = require('express-session');
    const { send } = require('process');
    const { throws } = require('assert');

    app.use(session({ secret: 'secretCode', resave: true, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login', function (req, res) {


    })

    app.post('/login', passport.authenticate('local', {

        failureRedirect: '/signUp'

    }), function (req, res) {

        res.redirect('/');
    })

    // 로그인 검사 미들웨어

    passport.use(new LocalStrategy({
        // name 속성
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, function (email, password, done) {


        dbAccount.collection('User').findOne({ email: email }, function (err, res) {
            if (err) return done(err)

            if (!res) return done(null, false, { message: '존재하지않는 아이디요' })
            bcrypt.compare(password, res.password).then((isMatch) => {
                console.log(password, res.password);
                if (isMatch) {
                    return done(null, res);

                } else { return done(null.false, { message: '비번 틀렸어요' }) }

            });
        })
    }));

    passport.serializeUser(function (res, done) {
        done(null, res.email)

    });
    passport.deserializeUser(function (id, done) {
        done(null, {})

    });




})

//   원본 passport
//   passport.use(new LocalStrategy(function verify(username, password, cb) {
//     db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
//       if (err) { return cb(err); }
//       if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//       crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//         if (err) { return cb(err); }
//         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//           return cb(null, false, { message: 'Incorrect username or password.' });
//         }
//         return cb(null, row);
//       });
//     });
//   }));


// 배열 초기화 함수
async function setPretestEccDataInMongoDB(data) {
    data = data.replace(/,/g, "");
    newData = data.split('&cutLine');


}


async function setPosttestEccDataInMongoDB(data) {
    data = data.replace(/,/g, "");
    newData = data.split('&cutLine');


}