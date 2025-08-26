const express = require('express');
const router = express.Router();
const {searchWithLLMs} = require('../services/llmService');


router.post('/search', async (req, res) => {
    const {prompt} = req.body;

    if (!prompt){
        return res.status(400).json({error: 'Prompt is required'});
    }
    try{
        const response = await searchWithLLMs(prompt);
        return res.json({source:searchWithLLMs, data:response});
    }catch (error) {
        console.error('Error searching with LLMs:', error);
        return res.status(500).json({error: 'LLM search failed', detail: error.message});
    }

});


module.exports = router;