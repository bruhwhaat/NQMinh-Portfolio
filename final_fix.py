import os
import re

def fix_mojibake(text):
    try:
        # The classic Mojibake fix: Encode as latin-1 and decode as utf-8
        # This handles cases like 'Táº¥t cáº£' -> 'Tất cả'
        return text.encode('utf-8').decode('latin-1').encode('utf-8').decode('latin-1')
    except:
        return text

# Manual mapping for common mangled patterns that are persistent
manual_fixes = {
    "Táº¥t cáº£": "Tất cả",
    "dÃ¹ng chung má»™t bá»™": "dùng chung một bộ",
    "MÃ n hÃ¬nh Chiáº¿n dá»‹ch": "Màn hình Chiến dịch",
    "Xem thAªm d An": "Xem thêm dự án",
    "Thi?t k?": "Thiết kế",
    "d? n": "dự án",
    "Sn phcm": "Sản phẩm",
    "Danh mc": "Danh mục",
    "Ti thi?t k?": "Tôi thiết kế",
    "mA ng?i dA1ng": "mà người dùng",
    "d An": "dự án",
    "Xem d? n": "Xem dự án",
    "mTt ngAy": "một ngày",
    "mTt": "một",
    "Thnh cA'ng": "Thành công",
    "BAi h?c": "Bài học",
    "Thá» i gian": "Thời gian",
    "Vai trÃ²": "Vai trò",
    "Tá»•ng quan": "Tổng quan",
    "tháº©m má»¹": "thẩm mỹ",
    "ngÆ°á» i dÃ¹ng": "người dùng",
    "sáº£n pháº©m": "sản phẩm",
    "Thiáº¿t káº¿": "Thiết kế",
    "dá»± Ã¡n": "dự án",
    "TÃ´i lÃ ": "Tôi là",
    "Thá»­ Ä‘á» c": "Thử đọc",
    "Hiá»‡n Ä‘ang": "Hiện đang",
    "cÆ¡ há»™i": "cơ hội"
}

files = [
    'index.html',
    'project_automotives.html',
    'project_Project Delta.html',
    'project_toptop.html',
    'project_heraxury.html',
    'project_s1.html'
]

border_pattern = r'<!--[• -]*'
border_replacement = '<!-- --------------------------------------------------------------------------------- '

for filename in files:
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'rb') as f:
        content = f.read().decode('utf-8', errors='ignore')
    
    # Fix the border comments first
    content = re.sub(r'<!--[• ·—=]*', '<!-- --------------------------------------------------------------------------- ', content)
    content = re.sub(r'[• ·—=]*-->', ' --------------------------------------------------------------------------- -->', content)
    
    # Fix the "How about another" dots specifically
    content = content.replace('• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •', '---------------------------------------------------------------------------')

    # Apply manual fixes
    for mangled, clean in manual_fixes.items():
        content = content.replace(mangled, clean)
    
    # Re-save as UTF-8
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Final cleanup and border fix completed.")
