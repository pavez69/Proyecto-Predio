import gridfs
from werkzeug.utils import secure_filename
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId

# Instantiation
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)
fs = gridfs.GridFS(mongo.db)

# Settings
CORS(app)

# Database
db = mongo.db.users


# Routes
#subir iamgenes
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'})
    if file:
        filename = secure_filename(file.filename)
        _id = fs.put(file, filename=filename)
        return jsonify(str(_id))



@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  id = db.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  })
  return jsonify(str(ObjectId(id)))


@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
  user = db.find_one({'_id': ObjectId(id)})
  print(user)
  return jsonify({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'email': user['email'],
      'password': user['password']
  })


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
  db.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'User Deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
  print(request.json)
  db.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  }})
  return jsonify({'message': 'User Updated'})































@app.route('/users/search', methods=['GET'])
def searchUsersByName():
    name = request.args.get('name')
    users = db.find({'name': {'$regex': name, '$options': 'i'}})
    results = []
    for user in users:
        user_data = {
            '_id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'password': user['password']
        }
        # Buscar la imagen asociada al usuario en GridFS
        user_image = fs.find_one({'_id': user.get('image_id')})
        if user_image:
            user_data['image'] = str(user_image._id)  # Obtener el ID de la imagen
        results.append(user_data)
    return jsonify(results)






if __name__ == "__main__":
    app.run(debug=True)

    