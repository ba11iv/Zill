const express = require("express");

const router = express.Router();

const { analyzeLink } = require("../services/linkService");

router.post("/", async (req, res) => {

    try {

        const { url } = req.body;

        // Check if URL exists
        if (!url) {

            return res.status(400).json({
                success: false,
                message: "URL is required."
            });

        }

        // Validate URL
        try {

            new URL(url);

        } catch {

            return res.status(400).json({
                success: false,
                message: "Invalid URL."
            });

        }

        const result = await analyzeLink(url);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Link Analysis Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to analyze the link at the moment."
        });

    }

});

module.exports = router;