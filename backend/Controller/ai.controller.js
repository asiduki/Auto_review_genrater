import express from 'express'; 
import generateContent from '../Src/Services/ai.service.js'; 
export const getResponse = async (req, res) => { 
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).send("Prompt is required");
    }
    const aiResponse = await generateContent(prompt); 
    res.send(aiResponse);
};