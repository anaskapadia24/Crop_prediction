from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import json
from PIL import Image

import numpy as np
import tensorflow as tf


from flask_cors import CORS
app = Flask(__name__)
CORS(app)


print('Model loaded. Check http://127.0.0.1:5000/')


working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = f"{working_dir}/trained_model/plant_disease_prediction_model.h5"
# Load the pre-trained model
model = tf.keras.models.load_model(model_path)
# loading the class names
class_indices = json.load(open(f"{working_dir}/class_indices.json"))

# Define function to preprocess image for prediction
def load_and_preprocess_image(image_path, target_size=(224, 224)):
    # Load the image
    img = Image.open(image_path)
    # Resize the image
    img = img.resize(target_size)
    # Convert the image to a numpy array
    img_array = np.array(img)
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    # Scale the image values to [0, 1]
    img_array = img_array.astype('float32') / 255.
    return img_array


# Function to Predict the Class of an Image
def predict_image_class(model, image_path, class_indices):
    preprocessed_img = load_and_preprocess_image(image_path)
    predictions = model.predict(preprocessed_img)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_name = class_indices[str(predicted_class_index)]
    return predicted_class_name
    

@app.route('/predict/potato', methods=['POST'])
def potato_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    # Save the file to ./uploads
    uploads_dir = os.path.join(app.root_path, 'uploads')
    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)
    # Save the file
    file_path = os.path.join(uploads_dir, secure_filename(file.filename))
    file.save(file_path)
    # Make prediction
    # preds = predict_disease(file_path, pneumonia_model)
    prediction = predict_image_class(model, file_path, class_indices)
    print("Predicted class:", prediction)
    return jsonify({'result': prediction})




if __name__ == '__main__':
    app.run(debug=True)