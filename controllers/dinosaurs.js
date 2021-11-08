const express = require("express")
const router = express.Router()
const fs = require("fs")

// INDEX ROUTE
router.get("/", (req, res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
             return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    //everytime you send an object through (below) you have to do it in a single object
    res.render("dinosaurs/index", {dinoData: dinoData})
})


// NEW ROUTE
router.get("/new", (req, res)=>{
    res.render("dinosaurs/new")
})


// GET UPDATE FORM
router.get("/edit/:idx", (req, res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    res.render("dinosaurs/edit", {dinoId: req.params.idx, dino: dinoData[req.params.idx]})
})

// UPDATE A DINO
router.put("/:idx", (req, res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    // reassigning the name and type fields of the dino to be editted 
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    res.redirect("/dinosaurs")
})

// SHOW ROUTE
router.get("/:idx", (req, res)=>{
    //the :idx is random, can be anything

    // get dinosaurs array
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url parameter
    let dinoIndex = req.params.idx
    // console.log(dinoData[dinoIndex])

    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]})
})



// POST A NEW DINO
router.post("/", (req, res)=>{
    // console.log(req.body)
    // get dinosaurs array
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    
    //add new dino to dinoData
    dinoData.push(req.body)
    
    //save updated dinoData to json
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    
    // redirect to GET /dinosaurs (index)
    res.redirect("/dinosaurs")
})

router.delete("/:idx", (req, res)=>{
        // get dinosaurs array
        let dinosaurs = fs.readFileSync("./dinosaurs.json")
        let dinoData = JSON.parse(dinosaurs)

        // remove the deleted dinosaur from the dinosaurs
        dinoData.splice(req.params.idx, 1)

        // save the new dinosaurs to the json file
        fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))

        res.redirect("/dinosaurs")
})

module.exports = router