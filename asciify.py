from PIL import Image
import cv2
import numpy as np
import os
ASCII_CHARS = [' ',',',':',';','+','*','?','%','S','#','@']
ASCII_CHARS = ASCII_CHARS[::-1]

'''
method resize():
    - takes as parameters the image, and the final width
    - resizes the image into the final width while maintaining aspect ratio
'''
def resize(image, new_width=100):
    (old_width, old_height) = image.size
    aspect_ratio = float(old_height)/float(old_width)
    new_height = int(aspect_ratio * new_width)
    new_dim = (new_width, new_height)
    new_image = image.resize(new_dim)
    return new_image
'''
method grayscalify():
    - takes an image as a parameter
    - returns the grayscale version of image
'''
def grayscalify(image):
    return image.convert('L')

'''
method modify():
    - replaces every pixel with a character whose intensity is similar
'''
def modify(image, buckets=25):
    initial_pixels = list(image.getdata())
    new_pixels = [ASCII_CHARS[pixel_value//buckets] for pixel_value in initial_pixels]
    return ''.join(new_pixels)


def handleVideo(path):
    cap = cv2.VideoCapture(path)
    index = 0
    while(cap.isOpened()):
        ret, frame = cap.read()
        if index % 100 == 0:
            print(index)
        if frame is None:
            continue
        pilImage = Image.fromarray(np.uint8(frame)).convert('RGB')
        do(pilImage, 100, f"/Users/Retard/video/{index}")
        index += 1
    f = open("/Users/Retard/video/config", 'w+')
    f.write( f"{index}")
    f.close()

'''
method do():
    - does all the work by calling all the above functions
'''
def do(image=[], new_width=100, path=""):
    image = resize(image)
    image = grayscalify(image)
    
    pixels = modify(image)
    len_pixels = len(pixels)

    
    new_image = [pixels[index:index+new_width] for index in range(0, len_pixels, new_width)]
    text = '\n'.join(new_image)
    fullpath = f"{path}.txt"
    if not os.path.exists(fullpath):
        with open(fullpath, 'w'): pass
    f = open(fullpath, 'w')
    f.write(text)
    f.close()
'''
method runner():
    - takes as parameter the image path and runs the above code
    - handles exceptions as well
    - provides alternative output options
'''
def runner(path):
    image = None
    try:
        image = Image.open(path)
    except Exception:
        print("Unable to find image in",path)
        #print(e)
        return
    image = do(image)
    # Else, to write into a file
    # Note: This text file will be created by default under
    #       the same directory as this python file,
    #       NOT in the directory from where the image is pulled.
    f = open('img.txt','w')
    f.write(image)
    f.close()

'''
method main():
    - reads input from console
    - profit
'''
if __name__ == '__main__':
    import sys
    path = sys.argv[1]
    handleVideo(path)
