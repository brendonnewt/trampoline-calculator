"""

# Author: Brendon Newton
# Project: Trampoline DD Calculator
# Filename: calculator-app.py
# Last Updated: 3/10/2024

Description: This file is a Flask project that creates the website for the
             Trampoline DD Calculator

"""

from flask import Flask, redirect, render_template, request, url_for, session
from Combo import Combo

app = Flask(__name__, template_folder='templates')

app.secret_key = 'ddCalc'

@app.route('/')
def index():
    return render_template('calculator.html')


@app.route('/calculate', methods=['POST'])
def calculate():
    if request.method == 'POST':
        if request.form.get("hidden-result", "") == "":
            session['result'] = ""
        else:
            combo = Combo()
            total = combo.calculate_input(request.form.get("hidden-result", ""))
            session['result'] = total

        return redirect(url_for('result'))
    
    return render_template('calculator.html')


@app.route('/calculate/success')
def result():
    result = session.get('result', 'No result available')
    return render_template('calculator.html', result=result)


@app.errorhandler(Exception)
def handle_error(e):
    return f"An error occurred: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
