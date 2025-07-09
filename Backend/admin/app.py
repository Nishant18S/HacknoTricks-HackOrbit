from flask import Flask, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin as FlaskAdmin, expose, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_login import LoginManager, login_user, login_required, logout_user, UserMixin, current_user
from flask_bcrypt import Bcrypt
import os


from db_connect import db
from models import User, Complaint, Scheme, Application, Admin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/janai-mitra'
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class AdminUser(UserMixin):
    pass

@login_manager.user_loader
def load_user(admin_id):
    admin = Admin.query.get(int(admin_id))
    if admin:
        user = AdminUser()
        user.id = admin.id
        return user
    return None

class MyAdminIndexView(AdminIndexView):
    @expose('/')
    @login_required
    def index(self):
        return super(MyAdminIndexView, self).index()



class UserModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated

class SchemeModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated

class ComplaintModelView(ModelView):
    can_create = False
    can_delete = False
    can_edit = True
    column_editable_list = ['status']

    def is_accessible(self):
        return current_user.is_authenticated

class ApplicationModelView(ModelView):
    can_create = False
    can_delete = False
    can_edit = True
    column_editable_list = ['status']

    def is_accessible(self):
        return current_user.is_authenticated


admin_panel = FlaskAdmin(app, name='Admin Dashboard', index_view=MyAdminIndexView(), template_mode='bootstrap3')
admin_panel.add_view(UserModelView(User, db.session))
admin_panel.add_view(SchemeModelView(Scheme, db.session))
admin_panel.add_view(ComplaintModelView(Complaint, db.session))
admin_panel.add_view(ApplicationModelView(Application, db.session))


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        admin_user = Admin.query.filter_by(username=username).first()
        if admin_user and (admin_user.password == password):
            user_obj = AdminUser()
            user_obj.id = admin_user.id
            login_user(user_obj)
            return redirect('/admin/')
        else:
            return "Invalid credentials", 401
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))



@app.route('/user/create', methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        new_user = User(
            user_id=request.form['user_id'],
            username=request.form['username'],
            email=request.form.get('email'),
            name=request.form.get('name'),
            phone_number=request.form.get('phone_number'),
            dob=request.form.get('dob'),
            address=request.form.get('address'),
            password=request.form.get('password')
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect('/admin/')  
    return render_template("create_user.html")





@app.route('/scheme/create', methods=['GET', 'POST'])
def create_scheme():
    if request.method == 'POST':
        new_scheme = Scheme(
            scheme_name=request.form['scheme_name'],
            description=request.form.get('description'),
            address=request.form.get('address'),
            dept_name=request.form.get('dept_name'),
            status=request.form.get('status', 'Pending'),
            eligibility_desc=request.form.get('eligibility_desc'),
            benefits_desc=request.form.get('benefits_desc'),
            amount=request.form.get('amount')
        )
        db.session.add(new_scheme)
        db.session.commit()
        return redirect('/admin/')  # ✅
    return render_template("create_scheme.html")



@app.route('/application/create', methods=['GET', 'POST'])
def create_application():
    if request.method == 'POST':
        new_app = Application(
            application_id=request.form['application_id'],
            user_id=request.form.get('user_id'),
            scheme_id=request.form.get('scheme_id'),
            status=request.form.get('status', 'Pending')
        )
        db.session.add(new_app)
        db.session.commit()
        return redirect('/admin/')  # ✅
    return render_template("create_application.html")





@app.route('/complaint/create', methods=['GET', 'POST'])
def create_complaint():
    if request.method == 'POST':
        new_complaint = Complaint(
            user_id=request.form['user_id'],
            username=request.form['username'],
            description=request.form.get('description'),
            location=request.form.get('location'),
            image=request.form.get('image'),
            status=request.form.get('status', 'Pending')
        )
        db.session.add(new_complaint)
        db.session.commit()
        return redirect('/admin/')  # ✅
    return render_template("create_complaint.html")



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
