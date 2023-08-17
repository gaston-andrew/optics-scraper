const PORT = 2200
const express =  require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const scraper = express()

scraper.listen(PORT, () => console.log(`server running on port ${PORT}`))

const url = 'https://www.opticsplanet.com/extra-bucks.html'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const inventory = []
        $('.grid gtmProduct two-block-tall product product_w-models float-left js-carousel-item', html).each(function(){
            const item = $(this).text()
            const price = $(this).find('data-price').attr('grid__item-flag grid__item-flag_medium-low-priority')
            inventory.push({
                item,
                price
            })
        })
        console.log(inventory)
    }).catch(err => console.log(err))
