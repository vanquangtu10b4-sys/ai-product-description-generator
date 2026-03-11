const express = require("express")

const app = express()

app.use(express.json())


app.get("/", (req, res) => {
    res.send("AI Product Description API is running")
})


app.post("/generate", (req, res) => {

    const product = req.body.product

    if (!product) {
        return res.status(400).json({
            error: "Product name is required"
        })
    }

    const description = `Premium ${product} designed for comfort and modern style.`

    res.json({
        product: product,
        description: description
    })

})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})