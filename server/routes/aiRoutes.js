import express from 'express';
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, generateImage, getCreations } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle) 
aiRouter.post('/generate-blog-title', auth, generateBlogTitle) 
aiRouter.post('/generate-image', auth, generateImage) 
aiRouter.get('/creations', auth, getCreations) 


export default aiRouter