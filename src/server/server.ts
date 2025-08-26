import express from 'express';

const server = express();

server.get('/',(req,res)=>{
return res.send('Testando 1 2')
});

export {server};