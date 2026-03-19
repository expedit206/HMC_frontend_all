import os

def resolve_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        stack = []
        output = []
        modified = False
        
        for line in lines:
            if line.startswith('<<<<<<< '):
                stack.append(1)
                modified = True
                continue
            elif line.strip() == '=======':
                if stack and (stack[-1] == 1 or stack[-1] == 2):
                    stack[-1] = 2
                continue
            elif line.startswith('>>>>>>> '):
                if stack:
                    stack.pop()
                continue
                
            # Check if we should output the current line
            should_output = True
            for s in stack:
                if s == 2:
                    should_output = False
                    break
                    
            if should_output:
                output.append(line)
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(output)
            print(f"Resolved {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.vue') or file.endswith('.js') or file.endswith('.ts'):
            resolve_file(os.path.join(root, file))
