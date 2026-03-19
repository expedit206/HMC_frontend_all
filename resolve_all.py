import re
import os

file_path = os.path.join('c:\\', 'laragon', 'www', 'home-cameroon', 'frontend', 'src', 'components', 'common', 'UnifiedSidebar.vue')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Resolve all standard git conflicts keeping HEAD.
resolved_content = re.sub(
    r'<<<<<<< HEAD(.*?)(?:=======)(.*?)(?:>>>>>>> [0-9a-f]+)',
    r'\1',
    content,
    flags=re.DOTALL
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(resolved_content)

print(f"Conflicts resolved in {file_path}")
