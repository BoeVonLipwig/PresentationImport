def getFileNames():
    specialFiles = getFileNamesFromDirectory("data/specialNodes")
    nodeFiles = getFileNamesFromDirectory("data/nodes")
    views = getFileNamesFromDirectory("data")
    return specialFiles,nodeFiles,views


def extractFileIntoList(file,path):
    with open(path+file,'r') as f:
        reader = csv.reader(f)
        instances = list(reader)
    return instances[1:], instances[0]


def generateOutputFile(elements):
    path = './output.json'
    jsonFile = open(path, 'w+')
    jsonFile.write(elements)
    jsonFile.close()


def getFileNamesFromDirectory(dir):
    onlyfiles = [f for f in listdir(dir) if isfile(join(dir, f))]
    return onlyfiles
