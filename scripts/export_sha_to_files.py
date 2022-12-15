import sys
import yaml
import argparse

parser = argparse.ArgumentParser()

parser.add_argument("-o", "--Output", help = "Define target directory")
parser.add_argument("paths", nargs='+')

args = parser.parse_args()

out_dir = ""

if args.Output:
    print("Saving output files with SHA content to: % s" % args.Output)
    out_dir=args.Output
    if not out_dir.endswith('/') or not out_dir.endswith('\\'):
        out_dir += '/'

for i in args.paths:
    file_path = i
    print("\n", "Processing file:", file_path)

    with open(file_path, "r") as s:
        data = yaml.safe_load(s)

    if 'packages' in data:
        packages = data['packages']
        for package in ['ia32', 'x64', 'arm64']:
            filename = out_dir + packages[package]['file']
            filename += "-sha512.txt"
            sha = packages[package]['sha512']
            print("  ", filename)
            with open(filename, "w") as f:
                f.write(sha)

    if 'files' in data:
        for file_yaml in data['files']:
            filename = out_dir + file_yaml['url']
            filename += "-sha512.txt"
            sha = file_yaml['sha512']
            print("  ", filename)
            with open(filename, "w") as f:
                f.write(sha)
