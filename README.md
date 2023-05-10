# Math Garden
Math Garden is a small data science project embedded in a web page for a children's math game. It consists of two parts: the data science module and the web page part.

## Data Science Model
The project uses a multilayer perceptron neural network trained on the MNIST dataset to recognize handwritten digits. The dataset comprises 28x28 binary images with four pixels of padding on each side, and the center of mass located in the center of the image.

The neural network has two hidden layers: the first layer has 512 neurons, and the second has 64. Both layers use a rectified linear unit (ReLU) activation function. As the input is a 28x28 binary image, the network has 784 inputs and 10 outputs, one for each digit.

To determine the most probable classification for each image, the softmax function was chosen as the activation function for the output layer. This expresses the output as a probability for each available class, ranging from 0 to 9.

The dataset was divided into training, validation, and testing data. The training data had 50,000 samples, validation had 10,000, and testing had 10,000.

The model was developed in Python using TensorFlow. After training, it was exported as TensorFlow.js to be used inside a web page.

## Webpage
The main file of the webpage is index.html, and several JavaScript functions were developed in four different files.

### drawing.js
This file creates the canvas and processes the user interaction with it. The function to clear the canvas after the check answer button is pressed is also scripted in this file.

### processing.js
This file is responsible for loading the model and preprocessing the drawn image to make it compatible with the training data. 

The preprocessing involves finding the bounding rectangle, cropping the image, resizing the image to 20x20 pixels, padding the image with 4 pixels for each border, finding and centering the center of mass. All of these operations are performed using OpenCV.

### math.js
This file has functions related to the mathematical part of the web page. The function to generate questions is programmed in it, as well as the function to check if the answer is correct. In this function, background changes according to the success or failure of the question.

### language.js
The purpose of this part of the code is to adapt the text to English or Portuguese. It is responsible for defining all the processes of changing the visible text between the two languages.



