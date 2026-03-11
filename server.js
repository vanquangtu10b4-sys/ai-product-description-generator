const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static(__dirname))

app.post("/generate", (req, res) => {

    const product = req.body.product

    const description = `Premium ${product} designed for comfort and modern style.`

    res.json({
        product: product,
        description: description
    })

})
app.post("/generate-seo", (req, res) => {

    const product = req.body.product

    const description = `Buy the best ${product} online. Premium quality ${product} designed for modern lifestyle and optimized for ecommerce SEO.`

    res.json({
        product,
        description
    })

})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})