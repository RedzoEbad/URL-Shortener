const shortUrlModel = require('../Model/Model'); // Importing the model
const short_Id = require('shortid'); // Importing shortid to generate short URLs
const express = require('express');
const server = express();

// Function to handle POST request to shorten a URL
async function Handle_Post_Request(req, res) {
    const url = req.body.Url;
    const shortUrlGenerated = short_Id.generate();

    if (!url) {
        return res.status(400).send("URL is required");
    }

    try {
        const newUrl = new shortUrlModel({
            url: url,
            short_url: shortUrlGenerated
        });

        await newUrl.save();

        // Now passing the shortUrl to the 'Home' view
        return res.status(201).render('Home', {
            shortUrl: shortUrlGenerated  // Pass the generated short URL
        });

    } catch (err) {
        console.log("Error occurred in POST controller: " + err);
        return res.status(500).send("Internal Server Error");
    }
}

// Function to handle GET request for redirecting to the original URL
async function Handle_Get_Request(req, res) {
    const id = req.params.id; // Retrieve the short URL ID from the request parameters

    if (!id) {
        return res.status(404).send("Short URL ID is required"); // Handle missing ID error
    }

    try {
        // Find the original URL from the database using the short ID
        const originalUrl = await shortUrlModel.findOne({ short_url: id });

        if (!originalUrl) {
            return res.status(404).send("Short URL not found"); // Handle if the short URL doesn't exist
        }

        // Redirect to the original URL
        return res.redirect(originalUrl.url);

    } catch (err) {
        console.log("Error occurred in GET controller: " + err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { Handle_Post_Request, Handle_Get_Request };
