from db_connect import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120))
    phone_number = db.Column(db.String(20))
    dob = db.Column(db.Date)
    address = db.Column(db.Text)
    password = db.Column(db.String(255), nullable=False)

    complaints = db.relationship('Complaint', backref='user', lazy=True)
    applications = db.relationship('Application', backref='user', lazy=True)


class Complaint(db.Model):
    __tablename__ = 'complaints'
    id = db.Column(db.Integer, primary_key=True)
    complaint_id = db.Column(db.String(100), unique=True, nullable=False)
    user_id = db.Column(db.String(100), db.ForeignKey('users.user_id'))
    grievance_name = db.Column(db.String(255))
    description = db.Column(db.Text)
    address = db.Column(db.Text)
    dept_name = db.Column(db.String(255))
    status = db.Column(db.String(50))


class Scheme(db.Model):
    __tablename__ = 'schemes'
    id = db.Column(db.Integer, primary_key=True)
    scheme_id = db.Column(db.String(100), unique=True, nullable=False)
    scheme_name = db.Column(db.String(255))
    description = db.Column(db.Text)
    eligibility_desc = db.Column(db.Text)
    benefits_desc = db.Column(db.Text)
    dept_name = db.Column(db.String(255))
    amount = db.Column(db.Numeric(10, 2))

    applications = db.relationship('Application', backref='scheme', lazy=True)


class Application(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(db.String(100), unique=True, nullable=False)
    user_id = db.Column(db.String(100), db.ForeignKey('users.user_id'))
    scheme_id = db.Column(db.String(100), db.ForeignKey('schemes.scheme_id'))
    status = db.Column(db.String(50))


class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    

