from flask import Flask, render_template, request, send_from_directory
import google.generativeai as genai
from markdown import markdown

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template('index.html')

@app.route("/historia")
def historia():
    return render_template('historia.html')
@app.route('/dados')
def dados():
    return send_from_directory('.', 'dados.json')
@app.route("/contato")
def contato():
    return render_template('contato.html')

@app.route("/atletas")
def atletas():
    return render_template('atletas.html')

@app.route("/eventos")
def eventos():
    return render_template('eventos.html')

@app.route("/medalhas")
def medalhas():
    return render_template('medalhas.html')
@app.route("/noticias")
def noticias():
    return render_template('noticias.html')

google_chave_api = "AIzaSyBa4FjAvPjT3BXajPJqeWNX-vN9r7TKNcw"
genai.configure(api_key=google_chave_api)

configuração_generalização = {
    "candidate_count": 1, 
    "temperature": 0.5, 
}

configuração_segura = {
    "HARASSMENT": "BLOCK_NONE", 
    "HATE": "BLOCK_NONE",
    "SEXUAL": "BLOCK_NONE",
    "DANGEROUS": "BLOCK_NONE"
}

modelo = genai.GenerativeModel(model_name="gemini-1.0-pro",
                               generation_config=configuração_generalização,
                               safety_settings=configuração_segura)

chat = modelo.start_chat(history=[])

@app.route("/papaodacuruzu", methods=["GET", "POST"])
def papaodacuruzu():
    user_message = ''
    bot_response = ''
    if request.method == "POST":
        if 'clear' in request.form:
            return render_template('chatbot_gui.html', user_message='', bot_response='')

        if 'form' in request.form and request.form['form'] == 'pergunta':
            user_message = request.form.get('question')
            if user_message:
                bot_response = chat.send_message(user_message).text
                bot_response = markdown(bot_response)
            else:
                bot_response = ''
    return render_template('chatbot_gui.html', user_message=user_message, bot_response=bot_response)

if __name__ == '__main__':
    app.run(debug=True)
