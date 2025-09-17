


from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from pyngrok import ngrok
import torch

device = 0 if torch.cuda.is_available() else -1
generator = pipeline("text-generation", model="gpt2", device=device)

app = Flask(__name__)
CORS(app)
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "AI service running"})


@app.route("/api/generate/article", methods=["POST"])
def generate_article():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        result = generator(
            prompt,
            max_length=200,
            num_return_sequences=1,
            do_sample=True,
            top_k=50,
            top_p=0.95
        )
        return jsonify({"prompt": prompt, "article": result[0]["generated_text"]})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


ngrok.set_auth_token("YourAuthTokenHere")

public_url = ngrok.connect(5000)
print("🚀 Public URL:", public_url)

app.run(port=5000)
