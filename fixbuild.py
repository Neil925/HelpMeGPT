import os
import shutil

def main():
    scanFolder("build/", eatFile, lambda x : str.endswith(x, ".js"))
    copyFiles("src/", "build/")

def copyFiles(cfrom, cto):
    scanFolder(cfrom, copyFile, lambda x : not str.endswith(x, ".ts"))

def copyFile(path): 
    path = path.replace('/', '', 1)
    copyTo = path.replace("src/", "build/")
    folder = copyTo[0:copyTo.rfind("/")]

    if not os.path.exists(folder):
        os.mkdir(folder)

    shutil.copyfile(path, path.replace("src/", "build/"))

def scanFolder(path, action, condition):
    for fileName in os.listdir(path):
        newPath = f"{path}/{fileName}"
        if os.path.isdir(newPath):
            scanFolder(newPath, action, condition)
            continue
        elif condition(fileName):
            action(newPath)

def eatFile(path):
    with open(path) as file:
        lines = file.readlines()
    
    with open(path, 'w') as file:
        for line in lines:
            if not line.__contains__("export {};"):
                file.write(line)

if __name__ == "__main__":
    main()