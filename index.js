#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const Spinner = require('cli-spinner').Spinner;
const colors = require('colors/safe')
const config = require('./src/config')
const md5 = require('./src/md5')

let transWord = program.parse(process.argv).args[0];
let spinner = new Spinner('⏰  正在查询中.. %s');
spinner.setSpinnerString('|/-\\');
spinner.start();

if (!transWord) {
    spinner.stop(true)
    console.log('😁  请输入要查询的单词')
    return
}

let str1 = config.appKey + transWord + config.salt + config.key;
let sign = md5(str1)
let options = {
    url: 'http://openapi.youdao.com/api',
    method: 'post',
    params: {
        q: encodeURI(transWord),
        appKey: config.appKey,
        salt: config.salt,
        from: config.from,
        to: config.to,
        sign: sign
    }
}

axios(options).then(res => {
    spinner.stop(true)
    let basicList = res.data.basic;
    let transMean = basicList.explains.toString()
    if(/^zh/.test(res.data.l)){
        console.log('释义:',colors.magenta(transMean)+'\n');
        return
    }
    if(basicList.explains&&basicList['uk-phonetic']){
        let ukPhonetic = basicList['uk-phonetic'].split(';')[0];
        let usPhonetic = basicList['us-phonetic'].split(';')[0];
        console.log('英',colors.magenta('['+ukPhonetic+']'),'美',colors.magenta('['+usPhonetic+']')+'\n');
        console.log('释义:',colors.magenta(transMean)+'\n');
    }else{
        console.log('释义:',colors.magenta(transMean)+'\n');
    }
}).catch(err=>{
    spinner.stop(true)
    console.log('😂  出错了...'+err)
})