var model;
async function loadModel() {
    model = await tf.loadGraphModel('TFJS/model.json')
}

function predictImage() {

    let image = cv.imread(canvas);
    cv.cvtColor(image, image, cv.COLOR_RGB2GRAY, 0)
    cv.threshold(image, image, 175, 255, cv.THRESH_BINARY);
    
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

    let cnt = contours.get(0)

    let rectangle = cv.boundingRect(cnt);
    image = image.roi(rectangle);

    var height = image.rows;
    var width = image.cols;

    if (height>=width) {
        ratio = height/20;
        height = 20;
        width = Math.round(width/ratio);
    } else{
        ratio = width/20;
        width = 20;
        height = Math.round(height/ratio)
    }
    
    let dsize = new cv.Size(width, height);
    
    cv.resize(image, image, dsize, 0, 0, cv.INTER_AREA);

    const LEFT = Math.ceil(4+(20-width)/2);
    const RIGHT = Math.floor(4+(20-width)/2);
    const BOTTOM = Math.ceil(4+(20-height)/2);
    const TOP = Math.floor(4+(20-height)/2);

    
    let COLOR = new cv.Scalar(0, 0, 0, 0);
    cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, COLOR);

    // Center of Mass
    cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    cnt = contours.get(0);
    const moments = cv.moments(cnt, false);
    const cx = moments.m10 / moments.m00
    const cy = moments.m10 / moments.m00

    const X_SHIFT = Math.round(image.cols/2 - cx);
    const Y_SHIFT = Math.round(image.rows/2 - cy);
    dsize = new cv.Size(image.rows, image.cols);
    let M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, X_SHIFT, 0, 1, Y_SHIFT]);
    cv.warpAffine(image, image, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, COLOR);
    
    let pixelValues = image.data;
    pixelValues = Float32Array.from(pixelValues);

    pixelValues = pixelValues.map(function (item) {
        return item/255.0;
        
    });
    
    const X = tf.tensor([pixelValues]);

    const result = model.predict(X);
    // result.print();

    const output = result.dataSync();
    
    // Cleaning
    // Free momory used by opencv.js
    image.delete();
    contours.delete();
    cnt.delete();
    hierarchy.delete();
    M.delete();

    // Free momory used by TensorFlow.js
    X.dispose();
    result.dispose();

    return output;

}