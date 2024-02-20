import os

def main():
    path = "build/"

    scanFolder(path)
    

def scanFolder(path):
    for fileName in os.listdir(path):
        newPath = f"{path}/{fileName}"
        if (os.path.isdir(newPath)):
            scanFolder(newPath)
            continue
        eatFile(newPath)

def eatFile(path):
    with open(path) as file:
        for line in file.readlines():
            print(line)

    


if __name__ == "__main__":
    main()