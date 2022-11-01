const express = require("express")
const router = express.Router()
const fs = require("fs")
const uniqid = require('uniqid')

router.get('/api/notes', (req,res)=>{
    fs.readFile('db/db.json', 'utf8', (err,data)=>{
        if(err)throw err
        return res.json(JSON.parse(data))
    })
})

router.delete('/api/notes:id', (req,res)=>{
    deleteNotes(req.params.id)
    res.status(200).send()
})

router.post('/api/notes', (req,res)=>{
    const dbData= JSON.parse(fs.readFileSync("db/db.json"));
        const newNotes = req
        const id = 'id'
        const noteId = uniqid()
        newNotes[id] = noteId
        dbData.push(newNotes)
        fs.writeFileSync('db/db.json', JSON.stringify(dbData), (err)=>{
            if(err)throw err
            res.json(dbData)
        })
})

