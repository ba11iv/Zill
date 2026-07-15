const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

const { analyzeScreenshot } = require("../services/aiService");

router.post("/", upload.single("image"), async (req, res) => {

    try {

        // Check if image exists
        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Image is required."
            });

        }

        const result = await analyzeScreenshot(req.file.path);

        // Delete uploaded image after analysis
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error("Failed to delete uploaded file:", err.message);
            }
        });

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Screenshot Analysis Error:", error.message);

        // Delete uploaded image if an error occurs
        if (req.file) {

            fs.unlink(req.file.path, () => {});

        }

        return res.status(500).json({
            success: false,
            message: "Unable to analyze the image at the moment."
        });

    }

});

module.exports = router;