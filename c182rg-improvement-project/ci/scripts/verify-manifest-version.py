import os
import json
import sys

# absolute path to the directory name this script lives in
script_dir = os.path.dirname(__file__)
manifest_path = os.path.join(script_dir, "..", "..", "manifest.json")

with open(manifest_path, encoding="utf-8") as f:
    manifest = json.load(f)

manifest_version = manifest["package_version"]
github_tag_version = os.environ["GITHUB_REF_NAME"]

if manifest_version != github_tag_version:
    print("[ERROR] - manifest version does not match github tag version")
    print(f"Manifest version: {manifest_version}")
    print(f"GitHub tag version: {github_tag_version}")
    sys.exit(1)
