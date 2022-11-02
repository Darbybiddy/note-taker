const express = require("express")
const router = express.Router()
const fs = require("fs")
const uniqid = require('uniqid')
const db = require("../db/db.json")

router.get('/api/notes', (req,res)=>{
    fs.readFile('db/db.json', 'utf8', (err,data)=>{
        if(err)throw err
        return res.json(JSON.parse(data))
    })
})

// router.delete('/api/notes:id', (req,res)=>{
//     deleteNotes(req.params.id)
//     res.status(200).send()
// })

router.post('/api/notes', (req,res)=>{
        const newNotes = req.body
        const id =  db.length + 1
        newNotes.id = id
        db.push(newNotes)
        fs.writeFileSync('db/db.json', JSON.stringify(db), (err)=>{
            if(err)throw err
            res.json(db)
        })
})

module.exports = router
