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
        if request.form.get("result-value", "") == "":
            session['result'] = ""
            print("there")
        else:
            print("here")
            combo = Combo()
            total = combo.calculate_input(request.form.get("result-value", ""))
            session['result'] = total

        return redirect(url_for('result'))
    
    return render_template('calculator.html')


@app.route('/calculate/w')
def result():
    result = session.get('result', 'No result available')
    return render_template('calculator.html', result=result)


@app.route('/test')
def help():
    return "PLEASEPLEASEPLEASE"


@app.errorhandler(Exception)
def handle_error(e):
    return f"An error occurred: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True)
