import json, os, time
from flask import Flask, Response, request, redirect, render_template, url_for, flash
from flask.ext.login import LoginManager, login_user, logout_user, login_required
from flask.ext.wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired
from flask.ext.bcrypt import Bcrypt
from dataModules.comSystem import comSystem

app = Flask(__name__, static_url_path='', static_folder='public', template_folder='public')
bcrypt = Bcrypt(app)

app.config.from_object('config')
login_manager = LoginManager()
login_manager.init_app(app)


login_manager.login_view = 'login'
#-------------users------------------#
class User():

    def __init__(self, username):
        self.username = username
        self.email = None

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.username

    @staticmethod
    def validate_login(password_hash, password):
        return bcrypt.check_password_hash(password_hash, password)


#-------------forms------------------#
class LoginForm(Form):

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])





#-------------views------------------#


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST' and form.validate_on_submit():
        user = app.config['USERS_COLLECTION'].find_one({"_id": form.username.data})
        if user and User.validate_login(user['password'], form.password.data):
            user_obj = User(user['_id'])
            login_user(user_obj)
            flash("Logged in successfully!", category='success')
            return redirect(request.args.get("next") or url_for("demo"))
        flash("Wrong username or password!", category='error')
    flash("username : demo       password: demo", category='info')
    return render_template('login.html', title='login', form=form)


@app.route('/logout')
def logout():
    logout_user()
    flash("You are logged out", category='info')
    return redirect(url_for('home'))


@app.route('/demo', methods=['GET', 'POST'])
@login_required
def demo():
    return render_template('demo.html')






@app.route('/api/data', methods=['GET', 'POST'])
def data_handler():

    with open('data.json', 'r') as file:
        data = json.loads(file.read())

    if request.method == 'POST':
        newDatum = request.form.to_dict()
        #TODO make turn comSystem into seperate functions
        newDatum['text'],newDatum['dataset1'],newDatum['dataset2'] = comSystem(newDatum['text'], int(newDatum['noise']) )
        newDatum['id'] = int(time.time() * 1000)
        data = [newDatum]


        with open('data.json', 'w') as file:
            file.write(json.dumps(data, indent=4, separators=(',', ': ')))

    return Response(json.dumps(data), mimetype='app/json', headers={'Cache-Control': 'no-cache'})



@login_manager.user_loader
def load_user(username):
    u = app.config['USERS_COLLECTION'].find_one({"_id": username})
    if not u:
        return None
    return User(u['_id'])



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
